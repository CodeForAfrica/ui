import React from "react";
import { SWRConfig } from "swr";

import RefreshRouteOnSave from "@/trustlab/components/PayloadLivePreview";
import { getPageStaticPaths, getPageStaticProps } from "@/trustlab/lib/data";
import Hero from "@/trustlab/components/Hero";

const componentsBySlugs = {
  "our-hero": Hero,
};

const slides = [
  {
    title: "Slide 1",
    subtitle: "Subtitle 1",
    description: "Description 1",
    backgroundImage:
      "https://res.cloudinary.com/koech/image/upload/v1748327851/862180d153d4b0cdd5a5052c040c6572b2b8c776_pz5je7.jpg",
    buttonText: "Explore our Resources",
    buttonLink: "/",
  },
  {
    title: "Slide 2",
    subtitle: "Subtitle 2",
    description: "Description 2",
    backgroundImage: "",
    buttonText: "Explore our Resources",
    buttonLink: "/",
  },
  {
    title: "Slide 3",
    subtitle: "Subtitle 3",
    description: "Description 3",
    backgroundImage: "",
    buttonText: "Explore our Resources",
    buttonLink: "/",
  },
];

function Page({ blocks = [{ slug: "our-hero", slides }], fallback }) {
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
      {/* <RefreshRouteOnSave /> */}
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

export async function getStaticPaths() {
  return getPageStaticPaths();
}

export async function getStaticProps(context) {
  return getPageStaticProps(context);
}

export default Page;
