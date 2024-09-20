import { Box } from "@mui/material";

import Article from "@/techlabblog/components/Article";
import { ArticleProps, getContent } from "@/techlabblog/lib/data";

export default async function Page({ params }: { params: { slug: string } }) {
  const post: ArticleProps = await getContent(params.slug);

  // TODO: Check that the post does exist, return 404 otherwise
  return <Article {...post} />;
}
