/* eslint-env browser */
import { Section } from "@commons-ui/core";
import React from "react";

import Figure from "./Figure";

export default {
  title: "Components/Figure",
  argTypes: {
    ImageProps: {
      control: {
        type: "object",
      },
    },
  },
};

function Template({ height, width, ...args }) {
  return (
    <Section>
      <Figure {...args} sx={{ height, width }} />
    </Section>
  );
}

export const Default = Template.bind({});

Default.parameters = {
  nextRouter: {
    path: "/profile/[id]",
    asPath: "/profile/lifeiscontent",
  },
};

Default.args = {
  height: 300,
  width: 600,
  ImageProps: {
    src: "/android-chrome-512x512.png",
  },
};
