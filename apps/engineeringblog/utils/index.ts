import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { format } from "date-fns";
export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  featuredImage: string;
  content: string;
};

export type ArticleWithoutContent = Omit<Article, "content">;

export function getAllPosts(): ArticleWithoutContent[] {
  const postsDirectory = path.join(process.cwd(), "content");
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"));

  const posts = fileNames.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug: fileName.replace(/\.mdx$/, ""),
      title: data.title,
      description: data.description,
      date: data.date,
      formattedDate: format(new Date(data.date), "MMM dd, yyyy"),
      featuredImage: data?.featuredImage,
    };
  });

  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export async function getBlogPost(slug: string): Promise<Article> {
  const postsDirectory = path.join(process.cwd(), "content");
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: format(new Date(data.date), "MMM dd, yyyy"),
    featuredImage: data.featuredImage,
    content,
  };
}
