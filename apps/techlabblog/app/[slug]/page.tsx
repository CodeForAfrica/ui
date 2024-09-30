import { Section } from "@commons-ui/core";

import { getPost } from "@/techlabblog/lib/data";
import PostHeader from "@/techlabblog/components/PostHeader";

export default async function Page({ params }: { params: { slug: string } }) {
  const { default: PostContent, frontmatter } = await getPost(params.slug);

  return (
    <Section
      sx={{
        px: { xs: 2.5, sm: 0 },
        py: { xs: 2.5, sm: 5 },
      }}
    >
      <PostHeader {...frontmatter} />
      <PostContent />
    </Section>
  );
}
