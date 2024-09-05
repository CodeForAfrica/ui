import { Container } from "@mui/material";
import { ArticleList } from "@/engineeringblog/components/Article";
import { getAllPosts } from "@/engineeringblog/utils";
import NoPosts from "@/engineeringblog/components/NoPosts";

export default async function index() {
  const posts = await getAllPosts();

  if (!posts.length) {
    return <NoPosts />;
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
