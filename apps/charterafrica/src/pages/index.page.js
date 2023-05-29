import React from "react";

import Ecosystem from "@/charterafrica/components/Ecosystem";
import FocalCountries from "@/charterafrica/components/FocalCountries";
import Helpdesk from "@/charterafrica/components/Helpdesk";
import Hero from "@/charterafrica/components/Hero";
import Infographic from "@/charterafrica/components/Infographic";
import Mooc from "@/charterafrica/components/Mooc";
import Partners from "@/charterafrica/components/Partners";
import Resources from "@/charterafrica/components/Resources";
import Spotlight from "@/charterafrica/components/Spotlight";
import { getPageServerSideProps } from "@/charterafrica/lib/data";

const componentsBySlugs = {
  ecosystem: Ecosystem,
  "focal-countries": FocalCountries,
  helpdesk: Helpdesk,
  hero: Hero,
  "aga-infographic": Infographic,
  mooc: Mooc,
  "our-partners": Partners,
  "our-resources": Resources,
  spotlight: Spotlight,
};

function Index({ blocks }) {
  return blocks?.map((block) => {
    const Component = componentsBySlugs[block?.slug];
    if (!Component) {
      return null;
    }
    return <Component {...block} key={block.id} />;
  });
}

export async function getServerSideProps(context) {
  return getPageServerSideProps(context);
}

export default Index;
