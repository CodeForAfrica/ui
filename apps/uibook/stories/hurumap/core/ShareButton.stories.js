import { ShareButton } from "@hurumap/core";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import XIcon from "@mui/icons-material/X";
import React from "react";

export default {
  title: "@hurumap/core/ShareButton",
  argTypes: {
    name: {
      control: {
        type: "select",
      },
      options: [
        "Facebook",
        "Twitter",
        "LinkedIn",
        "WhatsApp",
        "Email",
        "Telegram",
        "Pinterest",
      ],
    },
  },
};

const iconMapping = {
  Facebook: FacebookIcon,
  Twitter: XIcon,
  LinkedIn: LinkedInIcon,
  WhatsApp: WhatsAppIcon,
  Email: EmailIcon,
  Telegram: TelegramIcon,
  Pinterest: PinterestIcon,
};

function Template({ name, ...args }) {
  const IconComponent = iconMapping[name];
  return <ShareButton {...args} name={name} icon={IconComponent} />;
}

export const Default = Template.bind({});

Default.args = {
  url: "https://codeforafrica.org",
  name: "Facebook",
};
