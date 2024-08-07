import HeroPost from "@/components/HeroPost";
import { Post } from "@/lib/interfaces/post";
import { TAG } from "@/lib/constants/tag";
import { MUMA } from "@/lib/constants/authors";

import heroImage from "@/posts/sample-article/hero-image.webp";

const post: Post = {
  previewImage: {
    image: heroImage,
    alt: "A sample image",
  },
  title: "A sample Article",
  description: "A sample article about the nature of time",
  excerpt: "At the beginning of the time, the big bang created space.",
  publishingDate: "2024-08-01",
  authors: [MUMA],
  tags: new Set([TAG.DOKKU, TAG.AWS]),
};

export default function Home() {
  return (
    <>
      <HeroPost post={post} />
    </>
  );
}
