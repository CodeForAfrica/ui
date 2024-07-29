import { Share } from "@hurumap/core";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import CopyIcon from "@mui/icons-material/FileCopy";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import XIcon from "@mui/icons-material/X";
import React from "react";

const shareData = [
  {
    name: "Facebook",
    icon: FacebookIcon,
  },
  {
    name: "Twitter",
    icon: XIcon,
  },
  {
    name: "LinkedIn",
    icon: LinkedInIcon,
  },
  {
    name: "WhatsApp",
    icon: WhatsAppIcon,
  },
  {
    name: "Email",
    icon: EmailIcon,
  },
  {
    name: "Telegram",
    icon: TelegramIcon,
  },
  {
    name: "Pinterest",
    icon: PinterestIcon,
  },
  {
    name: "CopyUrl",
    icon: CopyIcon,
  },
];

export default {
  title: "@hurumap/core/Share",
  component: Share,
  argTypes: {
    url: {
      control: {
        type: "text",
      },
    },
    title: {
      control: {
        type: "text",
      },
    },
    chartType: {
      control: {
        type: "select",
      },
      options: ["line", "bar", "treemap"],
    },
    code: {
      control: {
        type: "text",
      },
    },
    geoCode: {
      control: {
        type: "text",
      },
    },
    indicatorId: {
      control: {
        type: "number",
      },
    },
    isCompare: {
      control: {
        type: "boolean",
      },
    },
    shareData: {
      control: {
        type: "object",
      },
    },
  },
};

function Template({ ...args }) {
  return <Share {...args} />;
}

export const Default = Template.bind({});

Default.args = {
  shareData,
  title: "Area of agricultural land in hectares",
  chartType: "treemap",
  code: "<h1>code</h1>",
  geoCode: "KE",
  indicatorId: 1087,
  isCompare: false,
  url: "http://localhost:3001/embed/ke/1087",
};
