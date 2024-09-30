import { Section } from "@commons-ui/core";

import PostList from "@/techlabblog/components/PostList";
import { getPosts } from "@/techlabblog/lib/data";

async function Page() {
  const posts = await getPosts();

  return (
    <Section
      sx={{
        px: { xs: 2.5, sm: 0 },
        py: { xs: 2.5, sm: 5 },
      }}
    >
      <PostList posts={posts} />
    </Section>
  );
}

export default Page;
