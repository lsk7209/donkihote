export type TopicStatus = 'pending' | 'processing' | 'completed' | 'failed';

export interface Topic {
  id: string;
  title: string;
  description?: string;
  keywords?: string[];
  status: TopicStatus;
  createdAt: string;
  completedAt?: string;
  error?: string;
}


