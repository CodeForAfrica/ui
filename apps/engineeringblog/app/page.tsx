import { Container } from "@mui/material";
import { ArticleList } from "@/engineeringblog/components/Article";
import { getAllPosts } from "@/engineeringblog/utils";

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
      <ArticleList articles={posts} />
    </Container>
  );
}
