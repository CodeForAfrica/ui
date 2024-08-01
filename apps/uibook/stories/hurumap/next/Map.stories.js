import { Map } from "@hurumap/next";
import React from "react";

import KE from "./ke.json";

export default {
  title: "@hurumap/next/Map",
  argTypes: {
    geography: {
      control: {
        type: "object",
      },
    },
    geometries: {
      control: {
        type: "object",
      },
    },
    tileLayers: {
      control: {
        type: "object",
      },
    },
    zoom: {
      control: {
        type: "number",
      },
    },
    center: {
      control: {
        type: "object",
      },
    },
    preferredChildren: {
      control: {
        type: "object",
      },
    },
  },
};

function Template({ ...args }) {
  return <Map {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  ...KE,
  tileLayers: [
    {
      url: "https://{s}.basemaps.cartocdn.com/rastertiles/voyager_nolabels/{z}/{x}/{y}.png",
      pane: "tiles",
      zIndex: 200,
    },
  ],
};
