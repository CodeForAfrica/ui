import { imageFromMedia } from "@/codeforafrica/lib/data/utils";

function stories(block) {
  const { featured = {}, title, search, excerpt, ...other } = block;
  const {
    title: featuredStoryTitle,
    coverImage: featuredStoryCoverImage,
    excerpt: featuredStoryExcerpt,
  } = featured;

  const featuredStory = {
    title: featuredStoryTitle,
    image: imageFromMedia({
      alt: featuredStoryTitle,
      ...featuredStoryCoverImage,
    }),
    excerpt: featuredStoryExcerpt,
    slug: "featured-story",
  };

  const storiesList = {
    ...other,
    slug: "stories-list",
  };

  return {
    ...featuredStory,
    storiesList,
  };
}

export default stories;
