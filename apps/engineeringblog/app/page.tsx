import { Section } from "@commons-ui/core";
import { ArticleList } from "@/engineeringblog/components/Article";
import { getAllContents } from "@/engineeringblog/utils";

export default async function index() {
  const posts = await getAllContents();

  return (
    <Section
      sx={{
        px: { xs: 2.5, sm: 0 },
        py: { xs: 2.5, sm: 5 },
      }}
    >
      <ArticleList articles={posts} />
    </Section>
  );
}
