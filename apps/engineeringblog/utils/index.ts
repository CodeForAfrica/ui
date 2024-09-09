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

async function readMdFile(filePath: string): Promise<MdFileContentProps> {
  const fileContent = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(fileContent);

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
      const { content, ...fileContent } = await readMdFile(filePath);

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
  const fileContent = await readMdFile(filePath);

  return {
    ...fileContent,
    slug,
  };
}
