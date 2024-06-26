import PropTypes from "prop-types";
import React from "react";

import AboutProject from "@/pesayetu/components/AboutProject";
import Metrics from "@/pesayetu/components/Metrics";
import Hero from "@/pesayetu/components/OtherHero";
import OurCourses from "@/pesayetu/components/OurCourses";
import Page from "@/pesayetu/components/Page";
import Project from "@/pesayetu/components/Project";
import StartLearning from "@/pesayetu/components/StartLearning";
import Summary from "@/pesayetu/components/Summary";
import SupportingPartners from "@/pesayetu/components/SupportingPartners";
import TooltipBanner from "@/pesayetu/components/TooltipBanner";
import formatBlocksForSections from "@/pesayetu/functions/formatBlocksForSections";
import getPostTypeStaticProps from "@/pesayetu/functions/postTypes/getPostTypeStaticProps";

export default function Home({ blocks, ...props }) {
  return (
    <Page {...props}>
      <Hero {...blocks?.otherHero} />
      <Metrics {...blocks?.metrics} />
      <TooltipBanner {...blocks?.tooltipBanner} />
      <Summary {...blocks?.summary} />
      <AboutProject {...blocks?.aboutProject} />
      <StartLearning {...blocks?.startLearning} />
      <OurCourses {...blocks?.ourCourses} />
      <Project {...blocks?.partnersAndNewsletter} />
      <SupportingPartners {...blocks?.supportingPartners} />
    </Page>
  );
}

Home.propTypes = {
  blocks: PropTypes.shape({
    aboutProject: PropTypes.shape({}),
    metrics: PropTypes.shape({}),
    otherHero: PropTypes.shape({}),
    ourCourses: PropTypes.shape({}),
    partnersAndNewsletter: PropTypes.shape({}),
    startLearning: PropTypes.shape({}),
    summary: PropTypes.shape({}),
    supportingPartners: PropTypes.shape({}),
    tooltipBanner: PropTypes.shape({}),
  }),
};

Home.defaultProps = {
  blocks: undefined,
};

export async function getStaticProps({ preview, previewData }) {
  const postType = "page";
  const { props, revalidate, notFound } = await getPostTypeStaticProps(
    { slug: "how-it-works" },
    postType,
    preview,
    previewData,
  );

  if (notFound) {
    return {
      notFound,
    };
  }

  const blocks = await formatBlocksForSections(props?.post?.blocks);

  return {
    props: {
      ...props,
      blocks,
    },
    revalidate,
  };
}
