import React from "react";

import Hero from ".";

import accentImage from "@/pesayetu/assets/images/Group 4780.svg";
import image from "@/pesayetu/assets/images/sat-mtKenya-2@2x.jpg";

export default {
  title: "PesaYetu/Sections/OtherHero",
  argTypes: {
    overline: {
      control: {
        type: "text",
      },
    },
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
    image: {
      control: {
        type: "select",
      },
    },
  },
};

function Template({ ...args }) {
  return <Hero {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  overline: "How it Works",
  accentImage,
  title: 'Explore and compare <span class="highlight">budget data</span>',
  subtitle:
    "Finding, comparing and using eye-catching data visualisations for specific regions is now much easier with PesaYetu",
  image,
};
