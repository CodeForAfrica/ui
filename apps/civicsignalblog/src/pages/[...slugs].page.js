import { useLivePreview } from "@payloadcms/live-preview-react";
import React from "react";
import { SWRConfig } from "swr";

import ArticlePage from "@/civicsignalblog/components/ArticlePage";
import Articles from "@/civicsignalblog/components/Articles";
import CustomPageHeader from "@/civicsignalblog/components/CustomPageHeader";
import LongForm from "@/civicsignalblog/components/LongForm/LongForm";
import PageHeader from "@/civicsignalblog/components/PageHeader";
import RelatedStories from "@/civicsignalblog/components/RelatedStories";
import { getPageServerSideProps } from "@/civicsignalblog/lib/data";

const componentsBySlugs = {
  article: ArticlePage,
  longform: LongForm,
  "custom-page-header": CustomPageHeader,
  "page-header": PageHeader,
  "recent-posts": RelatedStories,
  stories: Articles,
};

function Index(initialData) {
  const { data: props } = useLivePreview({
    serverURL: process.env.NEXT_PUBLIC_APP_URL || "",
    depth: 2,
    initialData,
  });
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
        const Component = componentsBySlugs[block.slug];
        if (!Component) {
          return null;
        }
        return <Component {...block} key={block.slug} />;
      })}
    </PageComponent>
  );
}

export async function getServerSideProps(context) {
  return getPageServerSideProps(context);
}

export default Index;
