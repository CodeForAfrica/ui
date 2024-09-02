import { Box, Container } from "@mui/material";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export function getAllPosts() {
  const postsDirectory = path.join(process.cwd(), "content");
  const fileNames = fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".mdx"));

  return fileNames.map((fileName) => {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    return {
      slug: fileName.replace(/\.mdx$/, ""),
      title: data.title,
      description: data.description,
      date: data.date,
      featuredImage: data?.featuredImage,
    };
  });
}

export default async function index() {
  const posts = await getAllPosts();
  return (
    <Container>
      <Box>
        {posts.map((post) => (
          <Box key={post.slug}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            <p>{post.date}</p>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
