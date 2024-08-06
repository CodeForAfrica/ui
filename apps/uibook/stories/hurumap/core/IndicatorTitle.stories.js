import { IndicatorTitle } from "@hurumap/core";
import DownloadIcon from "@mui/icons-material/Download";
import InfoIcon from "@mui/icons-material/Info";
import ShareIcon from "@mui/icons-material/Share";
import React from "react";

export default {
  title: "@hurumap/core/IndicatorTitle",
  component: IndicatorTitle,
};

function Template(args) {
  return <IndicatorTitle {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  children: <span>Area of agricultural land in hectares</span>,
  description: "Area of agricultural land by main purpose is in Hectares.",
  disableToggle: false,
  title: "Area of agricultural land in hectares",
  view: {},
  actions: [
    {
      id: "act-description",
      title: "Description",
      header: "Learn More",
      children: <span>Learn More</span>,
      icon: <InfoIcon />,
    },
    {
      id: "act-download",
      title: "Download",
      header: "Download",
      children: <span>Download</span>,
      icon: <DownloadIcon />,
    },
    {
      id: "act-share",
      title: "Share",
      header: "Share",
      children: <span>Share</span>,
      icon: <ShareIcon />,
    },
  ],
};
