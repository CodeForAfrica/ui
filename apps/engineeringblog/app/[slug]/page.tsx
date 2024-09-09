import { Box } from "@mui/material";

import Article from "@/engineeringblog/components/Article";
import { ArticleProps, getContent } from "@/engineeringblog/utils";

export default async function Page({ params }: { params: { slug: string } }) {
  const post: ArticleProps = await getContent(params.slug);

  // (TODO): Check that the post does exist, return 404 otherwise
  return <Article {...post} />;
}
