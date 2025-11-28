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
}


