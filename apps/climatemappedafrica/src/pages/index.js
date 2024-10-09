import PropTypes from "prop-types";
import React from "react";

import Hero from "@/climatemappedafrica/components/Hero";
import Page from "@/climatemappedafrica/components/Page";

import {
  fetchProfile,
  fetchProfileGeography,
} from "@/climatemappedafrica/lib/hurumap";

export default function Home({ boundary, blocks, ...props }) {
  return (
    <Page {...props}>
      <Hero {...blocks?.hero} boundary={boundary} />
    </Page>
  );
}

Home.propTypes = {
  boundary: PropTypes.shape({}),
  blocks: PropTypes.shape({
    hero: PropTypes.shape({}),
  }),
  footerProps: PropTypes.shape({}),
};

async function getPostTypeStaticProps(context, postType, preview, previewData) {
  return {};
}
export async function getStaticProps({ preview, previewData }) {
  const postType = "page";
  const { props, revalidate, notFound } = await getPostTypeStaticProps(
    { slug: "/" },
    postType,
    preview,
    previewData,
  );

  if (notFound) {
    return {
      notFound,
    };
  }

  const blocks = props?.post?.blocks || [];
  const { geometries } = await fetchProfileGeography("af");
  const { locations, ...rest } = await fetchProfile();
  const featuredLocations = locations.filter(
    ({ level }) => level === "country",
  );

  const { children } = geometries;

  return {
    props: {
      ...props,
      blocks: {
        ...blocks,
        hero: {
          featuredCounties: featuredLocations,
          comment: "Eight countries are currently implemented",
          title: "Data to hold your government accountable.",
          subtitle: "PesaYetu helps journalists, researchers and activists",
          searchLabel: "Search for a location",
          geometries,
        },
      },
      boundary: children?.country ?? null,
    },
    revalidate,
  };
}
