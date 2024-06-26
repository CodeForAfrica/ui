import React from "react";

import Stories from ".";

import cardImage from "@/pesayetu/assets/images/stephen-dawson-qwtCeJ5cLYs-unsplash.png";
import { insightDataTabStories } from "@/pesayetu/config";

export default {
  title: "PesaYetu/Components/Stories",
  argTypes: {
    featuredStoryProps: {
      control: {
        type: "object",
      },
    },
    items: {
      control: {
        type: "object",
      },
    },
  },
};

function Template({ ...args }) {
  return <Stories {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  featuredStoryProps: {
    title: "Our new website is out and it comes with new advanced features.",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit, magnis mus etiam nam lectus lobortis varius ultrices, donec dapibus dui felis est penatibus.",
    href: "/?path=/story/components-featured-story-card--default",
    ctaText: "Read More",
    image: cardImage,
  },
  items: insightDataTabStories.items,
};
