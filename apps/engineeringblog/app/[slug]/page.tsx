import { ArticleContent } from "@/engineeringblog/components/Article";
import { Box } from "@mui/material";
import { getBlogPost } from "@/engineeringblog/utils";

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug);
  return (
    <Box component="article">
      <ArticleContent article={post} />
    </Box>
  );
}
