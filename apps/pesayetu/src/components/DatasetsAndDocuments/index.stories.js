import React from "react";

import DatasetsAndDocuments from ".";

import { documentsAndDatasetsArgs } from "@/pesayetu/config";

export default {
  title: "PesaYetu/Sections/DatasetsAndDocuments",
  argTypes: {
    activeType: {
      control: {
        type: "select",
      },
      options: ["documents", "datasets"],
    },
  },
};

function Template(args) {
  return <DatasetsAndDocuments {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  ...documentsAndDatasetsArgs,
  activeType: "documents",
};
