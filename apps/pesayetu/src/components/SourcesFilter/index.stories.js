import React from "react";

import SourcesFilter from ".";

export default {
  title: "PesaYetu/Components/SourcesFilter",
};

function Template({ ...args }) {
  return <SourcesFilter {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  countLabel: "Dataset",
  count: 65,
  orderLabel: "Order By",
  orderOptions: ["Relevance"],
  paginationOptions: [10, 25, 50],
  paginationLabel: "Show",
};
