import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { buildBlogPrompt, getRandomToolSlug } from '../data/prompts';
import type { Topic } from '../types/topic';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const CONTENT_DIR = path.join(process.cwd(), 'content/blog');

if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY 환경 변수가 설정되지 않았습니다.');
  process.exit(1);
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomJitter(): number {
  return Math.floor(Math.random() * 15 * 60 * 1000);
}

function getPendingTopics(): Topic[] {
  try {
    const topicsPath = path.join(process.cwd(), 'data/topics.json');
    if (!fs.existsSync(topicsPath)) {
      return [];
    }
    const topicsData = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));
    return topicsData.topics?.filter((topic: Topic) => topic.status === 'pending') || [];
  } catch (error) {
    console.error('Error reading topics.json:', error);
    return [];
  }
}

function updateTopicStatus(topicId: string, status: Topic['status'], error?: string): void {
  try {
    const topicsPath = path.join(process.cwd(), 'data/topics.json');
    if (!fs.existsSync(topicsPath)) {
      console.error('topics.json file not found');
      return;
    }
    const topicsData = JSON.parse(fs.readFileSync(topicsPath, 'utf8'));
    if (!topicsData.topics || !Array.isArray(topicsData.topics)) {
      console.error('Invalid topics.json structure');
      return;
    }
    const topicIndex = topicsData.topics.findIndex((t: Topic) => t.id === topicId);
    
    if (topicIndex !== -1) {
      topicsData.topics[topicIndex].status = status;
      if (status === 'completed') {
        topicsData.topics[topicIndex].completedAt = new Date().toISOString();
      }
      if (error) {
        topicsData.topics[topicIndex].error = error;
      }
      fs.writeFileSync(topicsPath, JSON.stringify(topicsData, null, 2));
    }
  } catch (error) {
    console.error('Error updating topic status:', error);
  }
}

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

async function generateBlogPost(topic: Topic): Promise<void> {
  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const toolSlug = getRandomToolSlug();
  const prompt = buildBlogPrompt(topic.title, toolSlug);

  console.log(`Generating blog post for topic: ${topic.title}`);

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const content = response.text();

    if (!content) {
      throw new Error('Generated content is empty');
    }

    const slug = slugify(topic.title);
    const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

    if (!fs.existsSync(CONTENT_DIR)) {
      fs.mkdirSync(CONTENT_DIR, { recursive: true });
    }

    if (fs.existsSync(filePath)) {
      console.log(`File already exists: ${filePath}. Skipping...`);
      updateTopicStatus(topic.id, 'completed');
      return;
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Blog post saved: ${filePath}`);

    updateTopicStatus(topic.id, 'completed');
  } catch (error) {
    console.error(`Error generating blog post:`, error);
    updateTopicStatus(
      topic.id,
      'failed',
      error instanceof Error ? error.message : 'Unknown error'
    );
    throw error;
  }
}

function gitCommitAndPush(slug: string): void {
  try {
    execSync('git config user.name "Growth Engine Bot"', { stdio: 'inherit' });
    execSync('git config user.email "bot@example.com"', { stdio: 'inherit' });
    execSync(`git add content/blog/${slug}.mdx data/topics.json`, { stdio: 'inherit' });
    execSync(`git commit -m "Add blog post: ${slug}"`, { stdio: 'inherit' });
    execSync('git push', { stdio: 'inherit' });
    console.log('Git commit and push completed');
  } catch (error) {
    console.error('Git operation failed:', error);
    throw error;
  }
}

async function main(): Promise<void> {
  console.log('Starting blog post generator...');

  const jitter = getRandomJitter();
  console.log(`Waiting ${Math.floor(jitter / 1000 / 60)} minutes (jitter)...`);
  await sleep(jitter);

  const pendingTopics = getPendingTopics();
  
  if (pendingTopics.length === 0) {
    console.log('No pending topics found. Exiting.');
    return;
  }

  const topic = pendingTopics[0];
  console.log(`Processing topic: ${topic.title}`);

  updateTopicStatus(topic.id, 'processing');

  try {
    await generateBlogPost(topic);
    const slug = slugify(topic.title);
    gitCommitAndPush(slug);
    console.log('Blog post generation completed successfully!');
  } catch (error) {
    console.error('Failed to generate blog post:', error);
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Fatal error:', error);
  process.exit(1);
});


