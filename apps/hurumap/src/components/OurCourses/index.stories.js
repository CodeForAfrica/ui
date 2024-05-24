import React from "react";

import OurCourses from "@/hurumap/components/OurCourses";
import { ourCourses } from "@/hurumap/config";

export default {
  title: "Sections/OurCourses",
  argTypes: {},
};

function Template({ ...args }) {
  return <OurCourses {...args} />;
}

export const Default = Template.bind({});

Default.args = ourCourses;
