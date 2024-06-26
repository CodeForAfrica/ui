import React from "react";

import Hero from ".";

import { searchArgs } from "@/pesayetu/config";

export default {
  title: "PesaYetu/Sections/Hero",
  argTypes: {
    title: {
      control: {
        type: "text",
      },
    },
    subtitle: {
      control: {
        type: "text",
      },
    },
    comment: {
      control: {
        type: "text",
      },
    },
    selectProps: {
      control: {
        type: "object",
      },
    },
    boundary: {
      control: {
        type: "object",
      },
    },
    styles: {
      control: {
        type: "object",
      },
    },
    geoJSONStyles: {
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
  },
};

function Template({ ...args }) {
  return <Hero {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  title:
    'Data to hold <br /> your government <span class="highlight">accountable</span>',
  subtitle:
    "PesaYetu helps journalists, researchers and activists transform their work with in-depth county-specific information. Get started now with datasets from Kenya.",
  comment:
    "* Eight counties are currently available. We will soon implement additional ones.",
  center: [0.3051933453207569, 37.908818734483155],
  ...searchArgs,
};
