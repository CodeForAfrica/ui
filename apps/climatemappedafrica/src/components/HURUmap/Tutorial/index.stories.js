import { RichTypography } from "@commons-ui/legacy";
import React from "react";

import Tutorial from "@/climatemappedafrica/components/HURUmap/Tutorial";
import { hurumapArgs } from "@/climatemappedafrica/config";

const { tutorial } = hurumapArgs;

export default {
  title: "Components/HURUmap/Tutorial",
  argTypes: {},
};

function Template({ sampleElements, ...args }) {
  return (
    <>
      <Tutorial {...args} />
      {sampleElements.map((sample) => (
        <RichTypography>{sample}</RichTypography>
      ))}
    </>
  );
}

export const Default = Template.bind({});

Default.args = tutorial;
