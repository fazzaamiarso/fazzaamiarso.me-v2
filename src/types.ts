interface BaseFrontmatter {
  title: string;
  description: string;
  publishedAt: string;
  updatedAt?: string;
  minutesRead?: number;
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
