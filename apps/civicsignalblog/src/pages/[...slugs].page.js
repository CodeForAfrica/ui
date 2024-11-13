import React from "react";
import { SWRConfig } from "swr";

import ArticlePage from "@/civicsignalblog/components/ArticlePage";
import Articles from "@/civicsignalblog/components/Articles";
import CustomPageHeader from "@/civicsignalblog/components/CustomPageHeader";
import LongForm from "@/civicsignalblog/components/LongForm/LongForm";
import PageHeader from "@/civicsignalblog/components/PageHeader";
import RelatedStories from "@/civicsignalblog/components/RelatedStories";
import { getPageServerSideProps } from "@/civicsignalblog/lib/data";
import { useLivePreview } from "@/civicsignalblog/utils/useLivePreview";

const componentsBySlugs = {
  article: ArticlePage,
  longform: LongForm,
  "custom-page-header": CustomPageHeader,
  "page-header": PageHeader,
  "recent-posts": RelatedStories,
  stories: Articles,
};

function Index(initialData) {
  let { data: props } = useLivePreview({
    serverURL: process.env.NEXT_PUBLIC_APP_URL || "",
    depth: 2,
    initialData,
  });

  // Transform the preview data after receiving it, this is not the cleanest approach
  props = {
    ...props,
    blocks: props?.blocks?.map((block) => {
      if (block.blockType === "post-list") {
        return {
          title: block.stories?.title,
          featured: block.stories?.featured
            ? {
                ...block.stories.featured,
                image: {
                  src:
                    block.stories.featured.coverImage?.url ||
                    block.stories.featured.meta?.image?.url,
                  alt:
                    block.stories.featured.coverImage?.alt ||
                    block.stories.featured.meta?.image?.alt,
                },
              }
            : null,
          posts: [],
          pagination: { count: 1, page: 1 },
          primaryTag: block.primaryTag,
          tags: [],
          slug: block?.primaryTag,
          labels: block.labels,
        };
      }
      return block;
    }),
  };

  const { blocks, fallback } = props;
  if (!blocks?.length) {
    return null;
  }

  let PageComponent = React.Fragment;
  let pageComponentProps;
  if (fallback) {
    PageComponent = SWRConfig;
    pageComponentProps = { value: { fallback } };
  }
  return (
    <PageComponent {...pageComponentProps}>
      {blocks.map((block) => {
        const blockType = block.slug || block.blockType;
        const blockId = block.id || block.name || block.blockType;
        const Component = componentsBySlugs[blockType];
        if (!Component) {
          return null;
        }
        return <Component {...block} key={blockId} />;
      })}
    </PageComponent>
  );
}

export async function getServerSideProps(context) {
  return getPageServerSideProps(context);
}

export default Index;
