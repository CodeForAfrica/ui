import { Container } from "@mui/material";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { format } from "date-fns";
import { ArtilceList } from "@/engineeringblog/components/Article";

export function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), "content");
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"));

  return fileNames.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: fileName.replace(/\.mdx$/, ""),
      title: data.title,
      description: data.description,
      date: format(new Date(data.date), "MMM dd, yyyy"),
      featuredImage: data?.featuredImage,
      content,
    };
  });
}

export default async function index() {
  const posts = await getAllPosts();

  if (!posts) {
    return <div>No posts!</div>;
  }

  return (
    <Container
      sx={{
        px: { xs: 2.5, sm: 0 },
        py: { xs: 2.5, sm: 5 },
      }}
    >
      <ArtilceList articles={posts} />
    </Container>
  );
}
