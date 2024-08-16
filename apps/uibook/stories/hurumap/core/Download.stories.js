import { Download } from "@hurumap/core";
import React from "react";

export default {
  title: "@hurumap/core/Download",
  component: Download,
};

function Template(args) {
  return <Download {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  backgroundColor: "white",
  cfalogo: null,
  chartSubtitle: "Subtitle",
  chartTitle: "Title",
  chartValue: "Value",
  currentFilters: [],
  data: [],
  disableToggle: false,
  fileTypes: ["CSV", "JSON", "XLSX"],
  handleChartValueChange: () => {},
  height: 100,
  isAction: true,
  imageTypes: ["PNG", "SVG"],
  layouts: ["Layout 1", "Layout 2"],
  projectlogo: null,
  profileNames: [],
  scaleFactor: 2,
  spec: {},
  source: "Source",
  title: "Download",
  values: [],
  view: null,
  sx: {
    width: 200,
  },
};
