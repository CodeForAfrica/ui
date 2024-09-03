import { Container } from "@mui/material";
import { ArticleList } from "@/engineeringblog/components/Article";
import { getAllPosts } from "@/engineeringblog/utils";
import Empty from "@/engineeringblog/components/Empty";

export default async function index() {
  const posts = await getAllPosts();

  if (!posts.length) {
    return <Empty />;
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
