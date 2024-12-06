import React from "react";

import ExploreOtherTools from ".";

import { exploreTools } from "@/pesayetu/config";

export default {
  title: "PesaYetu/Sections/ExploreOtherTools",
};

function Template({ ...args }) {
  return <ExploreOtherTools {...args} />;
}

export const Default = Template.bind({});

Default.args = exploreTools;
