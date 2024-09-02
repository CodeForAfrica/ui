import { Container, Grid } from "@mui/material";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import ArticleCard from "@/engineeringblog/components/Article";
import { format } from "date-fns";

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
      date: format(new Date(data.date), "MMM dd, yyyy"),
      featuredImage: data?.featuredImage,
    };
  });
}

export default async function index() {
  const posts = await getAllPosts();

  if (!posts) {
    return <div>No posts!</div>;
  }

  return (
    <Container>
      <Grid
        container
        rowSpacing={{ xs: "28px", md: 5 }}
        columnSpacing={{ xs: 0, sm: "18px", lg: "28px" }}
      >
        {posts?.map((article) => (
          <Grid item xs={12} sm={4} key={article.slug}>
            <ArticleCard article={article} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
