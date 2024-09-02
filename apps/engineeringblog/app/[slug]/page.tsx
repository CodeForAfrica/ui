import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { format } from "date-fns";

async function getBlogPost(slug: string) {
  const postsDirectory = path.join(process.cwd(), "content");
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: format(new Date(data.date), "MMM dd, yyyy"),
    content,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </div>
  );
}
