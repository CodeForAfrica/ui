import React from "react";

import Page from "@/codeforafrica/components/Page";
import { getPageStaticProps } from "@/codeforafrica/lib";

function Index(props) {
  return <Page {...props} />;
}

export async function getStaticProps() {
  return getPageStaticProps({ slug: "/" });
}

export default Index;
