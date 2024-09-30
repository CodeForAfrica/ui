import { compile, run } from "@mdx-js/mdx";
import { promises as fs } from "fs";
import type { MDXModule } from "mdx/types";
import path from "path";
import * as runtime from "react/jsx-runtime";

import { useMDXComponents } from "@/techlabblog/mdx-components";
import { rehypePlugins, remarkPlugins } from "@/techlabblog/mdx.config.mjs";

export type AuthorFrontMatterProps = {
  fullName: string;
  twitter: string;
  slug: string;
};

export type PostFrontMatterProps = {
  title: string;
  excerpt: string;
  publishedDate: string;
  featuredImage: string;
  slug: string;
  authors: AuthorFrontMatterProps[] | null;
};

async function readMdFile(filePath: string): Promise<MDXModule> {
  const fileContent = await fs.readFile(filePath, "utf8");
  const vfile = await compile(fileContent, {
    outputFormat: "function-body",
    providerImportSource: "../../mdx-components.tsx",
    rehypePlugins,
    remarkPlugins,
  });
  return run(vfile, { ...runtime, useMDXComponents });
}

async function listMdxFilesRecursively(dir: string): Promise<string[]> {
  const files = await fs.readdir(dir, { recursive: true });
  return files.filter((f) =>
    [".md", ".mdx"].includes(path.extname(f.toLowerCase())),
  );
}

export async function getAuthors(): Promise<PostFrontMatterProps[]> {
  const cwd = process.cwd();
  const postsDir = path.join(cwd, "content", "publication", "authors");
  const mdxFiles = await listMdxFilesRecursively(postsDir);
  const authorsPromises = mdxFiles.map(async (fileName) => {
    const filePath = path.join(postsDir, fileName);
    const { frontmatter } = await readMdFile(filePath);

    return {
      ...frontmatter,
      slug: fileName.replace(/\.mdx$/, ""),
    };
  });
  return (
    (await Promise.allSettled<PostFrontMatterProps>(authorsPromises))
      // TODO: log/send to Sentry those that fail
      .filter((p) => p.status === "fulfilled")
      .map((p) => p.value)
      .sort(
        (a, b) =>
          new Date(b.publishedDate).getTime() -
          new Date(a.publishedDate).getTime(),
      )
  );
}

export async function getPosts(): Promise<PostFrontMatterProps[]> {
  const postsDir = path.join(process.cwd(), "content", "publication", "posts");
  const mdxFiles = await listMdxFilesRecursively(postsDir);
  const postsPromises = mdxFiles.map(async (fileName) => {
    const filePath = path.join(postsDir, fileName);
    const { frontmatter } = await readMdFile(filePath);

    return {
      ...frontmatter,
      slug: fileName.replace(/\.mdx$/, ""),
    };
  });
  const posts = (await Promise.allSettled<PostFrontMatterProps>(postsPromises))
    // TODO: log/send to Sentry those that fail
    .filter((p) => p.status === "fulfilled")
    .map((p) => p.value)
    .sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime(),
    );
  if (!posts.length) {
    return posts;
  }
  const authors = await getAuthors();
  return posts.map((post) => {
    const { authors: authorsSlugs } = post;
    const postAuthors =
      authorsSlugs?.flatMap((aS) => {
        return authors.find((a) => a.slug == aS) || [];
      }) ?? null;
    return {
      ...post,
      authors: postAuthors,
    };
  });
}

export async function getPost(slug: string): Promise<MDXModule | void> {
  const postsDir = path.join(process.cwd(), "content", "publication", "posts");
  const mdxFiles = await listMdxFilesRecursively(postsDir);
  const postFiles = mdxFiles.filter(
    (f) => f.toLowerCase().replace(/\.mdx?$/, "") === slug,
  );
  if (postFiles.length !== 1) {
    return Promise.resolve();
  }

  const postPath = path.join(postsDir, postFiles[0]);
  const post = await readMdFile(postPath);
  const authors = await getAuthors();
  if (!authors?.length) {
    return post;
  }
  const { frontmatter } = post;
  const { authors: authorsSlugs } = frontmatter;
  const postAuthors =
    authorsSlugs?.flatMap((aS) => {
      return authors.find((a) => a.slug == aS) || [];
    }) ?? null;
  return {
    ...post,
    frontmatter: {
      ...frontmatter,
      authors: postAuthors,
    },
  };
}

type Menu = {
  label: string;
  href: string;
};

type ConnectPlatformProp =
  | "Facebook"
  | "Twitter"
  | "Instagram"
  | "Linkedin"
  | "Github"
  | "Slack";

type ConnectLinkProp = {
  platform: ConnectPlatformProp;
  url: string;
};

export type ConnectProps = {
  title: string;
  links: ConnectLinkProp[];
};

type NavigationProps = {
  menus: Menu[];
};

interface PrimaryNavigationProps extends NavigationProps {
  connect: ConnectPlatformProp;
}

interface SecondaryNavigationProps extends NavigationProps {
  copyright: string;
}

export type AnalyticsProps = {
  analyticsId: string;
};

type SettingsProps = {
  title: string;
  primaryNavigation: PrimaryNavigationProps;
  secondaryNavigation: SecondaryNavigationProps;
  connect: ConnectProps;
  analytics: AnalyticsProps;
};

async function readSettingsFile(filePath: string): Promise<SettingsProps> {
  const { frontmatter } = await readMdFile(filePath);

  return {
    analytics: frontmatter.analytics,
    connect: frontmatter.connect,
    primaryNavigation: frontmatter.primaryNavigation,
    secondaryNavigation: frontmatter.secondaryNavigation,
    title: frontmatter.title,
  };
}

export async function getSettings(): Promise<SettingsProps> {
  const filePath = path.join(process.cwd(), "content", "site", "settings.mdx");
  return readSettingsFile(filePath);
}
