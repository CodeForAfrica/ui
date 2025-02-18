import { Section } from "@commons-ui/core";

import PostHeader from "@/techlabblog/components/PostHeader";
import { getPost } from "@/techlabblog/lib/data";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const postModule = await getPost(params.slug);

  if (!(postModule && postModule.frontmatter)) {
    // TODO(kilemensi): 404
    return null;
  }
  const { default: PostContent, frontmatter } = postModule;
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
