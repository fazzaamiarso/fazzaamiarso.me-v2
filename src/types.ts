interface BaseFrontmatter {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  minutesRead?: number;
  draft: boolean;
}


export interface BlogFrontmatter extends BaseFrontmatter {
  series?: string;
  featured?: boolean;
}

export interface ProjectFrontmatter extends BaseFrontmatter {
  cover: string;
  github: string;
  liveSite: string;
  featured?: boolean;
  demo?: string;
}

export interface SnippetsFrontmatter extends BaseFrontmatter {
  tags: string[];
}
