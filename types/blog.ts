export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  author?: string;
  tags?: string[];
  category?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  published: boolean;
  content: string;
}

export interface BlogPostFrontmatter {
  title: string;
  description: string;
  date: string;
  author?: string;
  tags?: string[];
  category?: string;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  canonicalUrl?: string;
  published?: boolean;
}


