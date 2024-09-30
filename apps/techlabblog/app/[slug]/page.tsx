import { Section } from "@commons-ui/core";

import { getPost } from "@/techlabblog/lib/data";
import PostHeader from "@/techlabblog/components/PostHeader";

export default async function Page({ params }: { params: { slug: string } }) {
  const postModule = await getPost(params.slug);
  if (!postModule) {
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
      {frontmatter ? <PostHeader {...frontmatter} /> : null}
      <PostContent />
    </Section>
  );
}
