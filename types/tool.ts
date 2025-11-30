export interface Tool {
  slug: string;
  title: string;
  description: string;
  category?: string;
  tags?: string[];
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  published: boolean;
  content?: string;
  componentName?: string; // 동적으로 로드할 컴포넌트 이름
}


