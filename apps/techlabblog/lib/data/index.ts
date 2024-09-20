import { format } from "date-fns";
import { promises as fs } from "fs";
import matter from "gray-matter";
import path from "path";

type MdFileContentProps = {
  title: string;
  excerpt: string;
  publishedDate: string;
  featuredImage: string;
  content: string;
};

export interface ArticleProps extends MdFileContentProps {
  slug: string;
}

export type ArticleWithoutContentProps = Omit<ArticleProps, "content">;

async function readMdFile(filePath: string) {
  const fileContent = await fs.readFile(filePath, "utf8");
  return matter(fileContent);
}

async function readArticleFile(filePath: string): Promise<MdFileContentProps> {
  const { data, content } = await readMdFile(filePath);

  return {
    title: data.title,
    excerpt: data.excerpt,
    publishedDate: format(new Date(data.publishedDate), "MMM dd, yyyy"),
    featuredImage: data.featuredImage,
    content,
  };
}

export async function getAllContents(): Promise<ArticleWithoutContentProps[]> {
  const contentDir = path.join(process.cwd(), "content");
  const files = await fs.readdir(contentDir);
  const contentsPromises = files
    .filter((fileName) => fileName.endsWith(".mdx"))
    .map(async (fileName) => {
      const filePath = path.join(contentDir, fileName);
      const { content, ...fileContent } = await readArticleFile(filePath);

      return {
        ...fileContent,
        slug: fileName.replace(/\.mdx$/, ""),
      };
    });
  const contents = (
    await Promise.allSettled<ArticleWithoutContentProps>(contentsPromises)
  )
    // TODO: log/send to Sentry those that fail
    .filter((p) => p.status === "fulfilled")
    .map((p) => p.value)
    .sort(
      (a, b) =>
        new Date(b.publishedDate).getTime() -
        new Date(a.publishedDate).getTime(),
    );
  return contents;
}

export async function getContent(slug: string): Promise<ArticleProps> {
  const filePath = path.join(process.cwd(), "content", `${slug}.mdx`);
  const fileContent = await readArticleFile(filePath);

  return {
    ...fileContent,
    slug,
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

type SettingsProps = {
  title: string;
  primaryNavigation: PrimaryNavigationProps;
  secondaryNavigation: SecondaryNavigationProps;
  connect: ConnectProps;
};

async function readSettingsFile(filePath: string): Promise<SettingsProps> {
  const { data } = await readMdFile(filePath);

  return {
    connect: data.connect,
    primaryNavigation: data.primaryNavigation,
    secondaryNavigation: data.secondaryNavigation,
    title: data.title,
  };
}

export async function getSettings(): Promise<SettingsProps> {
  const filePath = path.join(process.cwd(), "content", "site", "settings.mdx");
  return readSettingsFile(filePath);
}
