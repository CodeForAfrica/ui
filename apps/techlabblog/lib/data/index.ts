import { compile, run } from "@mdx-js/mdx";
import { promises as fs } from "fs";
import type { PathLike } from "fs";
import type { MDXModule } from "mdx/types";
import path from "path";
import * as runtime from "react/jsx-runtime";

import { useMDXComponents } from "@/techlabblog/mdx-components";
import { rehypePlugins, remarkPlugins } from "@/techlabblog/mdx.config.mjs";

const PUBLICATION_DIR = ["content", "publication"];

export type Author = {
  fullName: string;
  twitter: string;
  slug: string;
};

type PostFrontMatter = {
  title: string;
  excerpt: string;
  publishedDate: string;
  featuredImage: string;
  slug: string;
  authors: string[] | null;
};

export interface Post extends Omit<PostFrontMatter, "authors"> {
  authors: Author[] | null;
}

export interface MDXFrontMatterModule<T> extends MDXModule {
  frontmatter?: T;
}

export type PostModule = MDXFrontMatterModule<Post>;

async function readMdFile<T>(
  ...paths: string[]
): Promise<MDXFrontMatterModule<T>> {
  const fileContent = await fs.readFile(path.join(...paths), "utf8");
  const vfile = await compile(fileContent, {
    outputFormat: "function-body",
    providerImportSource: "../../mdx-components.tsx",
    rehypePlugins,
    remarkPlugins,
  });
  return run(vfile, { ...runtime, useMDXComponents });
}

async function listMdxFilesRecursively(dir: PathLike): Promise<string[]> {
  const files = await fs.readdir(dir, { recursive: true });
  return files.filter((f) =>
    [".md", ".mdx"].includes(path.extname(f.toLowerCase())),
  );
}

export async function getAuthors(): Promise<Author[]> {
  const cwd = process.cwd();
  const authorsDir = path.join(cwd, ...PUBLICATION_DIR, "authors");
  const mdxFiles = await listMdxFilesRecursively(authorsDir);
  const promises = mdxFiles.map(async (fileName) => {
    const { frontmatter } = await readMdFile<Author>(authorsDir, fileName);
    if (!frontmatter) {
      return frontmatter;
    }
    return {
      ...frontmatter,
      slug: fileName.replace(/\.mdx$/, ""),
    };
  });
  const settledPromises = await Promise.allSettled<Author | undefined>(
    promises,
  );
  return (
    settledPromises
      // TODO: log/send to Sentry those that fail
      .filter((p) => p.status === "fulfilled")
      .map((p) => p.value)
      // NOTE: The !== undefined is just to satify TS
      .filter((a) => a !== undefined)
  );
}

function getPostAuthors(
  post: PostFrontMatter,
  authors: Author[],
): Author[] | null {
  const { authors: authorsSlugs } = post;
  if (!(authorsSlugs?.length && authors?.length)) {
    // TODO(kilemensi): log a warning to sentry
    return null;
  }

  const postAuthors =
    authorsSlugs.flatMap((aS) => {
      return authors.find((a) => a.slug == aS) || [];
    }) || null;
  if (!postAuthors?.length) {
    // TODO(kilemensi): log a warning to sentry (authors slugs without author details)
    return null;
  }
  return postAuthors;
}

export async function getPosts(): Promise<Post[]> {
  const cwd = process.cwd();
  const postsDir = path.join(cwd, ...PUBLICATION_DIR, "posts");
  const mdxFiles = await listMdxFilesRecursively(postsDir);
  const promises = mdxFiles.map(async (fileName) => {
    const { frontmatter } = await readMdFile<PostFrontMatter>(
      postsDir,
      fileName,
    );

    if (!frontmatter) {
      return frontmatter;
    }
    return {
      ...frontmatter,
      slug: fileName.replace(/\.mdx$/, ""),
    };
  });
  const settledPromises = await Promise.allSettled<PostFrontMatter | undefined>(
    promises,
  );
  const posts = settledPromises
    // TODO: log/send to Sentry those that fail
    .filter((p) => p.status === "fulfilled")
    .map((p) => p.value)
    // NOTE: The !== undefined is just to satify TS
    .filter((a) => a !== undefined)
    .sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime(),
    );
  if (!posts.length) {
    return [];
  }
  const authors = await getAuthors();
  return posts.map((post) => {
    const postAuthors = getPostAuthors(post, authors);
    return {
      ...post,
      authors: postAuthors,
    };
  });
}

export async function getPost(slug: string): Promise<PostModule | void> {
  const cwd = process.cwd();
  const postsDir = path.join(cwd, ...PUBLICATION_DIR, "posts");
  const mdxFiles = await listMdxFilesRecursively(postsDir);
  const postFiles = mdxFiles.filter(
    (f) => f.toLowerCase().replace(/\.mdx?$/, "") === slug,
  );
  if (postFiles.length !== 1) {
    return Promise.resolve();
  }

  const postPath = path.join(postsDir, postFiles[0]);
  const postFrontMatterModule = await readMdFile<PostFrontMatter>(postPath);
  if (!postFrontMatterModule.frontmatter) {
    return postFrontMatterModule as PostModule;
  }

  const authors = await getAuthors();
  const postAuthors = getPostAuthors(
    postFrontMatterModule.frontmatter,
    authors,
  );

  const { frontmatter, ...others } = postFrontMatterModule;
  return {
    ...others,
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

export async function getSettings(): Promise<SettingsProps | undefined> {
  const cwd = process.cwd();
  const { frontmatter } = await readMdFile<SettingsProps>(
    cwd,
    "content",
    "site",
    "settings.mdx",
  );

  return frontmatter;
}
