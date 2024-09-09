import { ArticleContent } from "@/engineeringblog/components/Article";
import { Box } from "@mui/material";
import { getContent } from "@/engineeringblog/utils";

export default async function Page({ params }: { params: { slug: string } }) {
  const post = await getContent(params.slug);
  return (
    <Box component="article">
      <ArticleContent article={post} />
    </Box>
  );
}
