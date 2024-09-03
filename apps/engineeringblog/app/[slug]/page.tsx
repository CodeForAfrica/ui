import fs from "fs";
import matter from "gray-matter";
import path from "path";
import { format } from "date-fns";
import { ArticleContent } from "@/engineeringblog/components/Article";
import { Box } from "@mui/material";
import { remark } from "remark";
import html from "remark-html";
import remarkMdx from "remark-mdx";

async function getBlogPost(slug: string) {
  const postsDirectory = path.join(process.cwd(), "content");
  const filePath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(remarkMdx)
    .use(html)
    .process(content);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: format(new Date(data.date), "MMM dd, yyyy"),
    featuredImage: data.featuredImage,
    content: processedContent.toString(),
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  return (
    <Box component="article">
      <ArticleContent article={post} />
    </Box>
  );
}
