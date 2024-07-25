import React from "react";
import {
  TwitterShareButton,
  LinkedinShareButton,
  FacebookShareButton,
  EmailShareButton,
  WhatsappShareButton,
} from "react-share";

import { ReactComponent as EmailIcon } from "@/hurumap/core/assets/Email.svg";
import { ReactComponent as FacebookIcon } from "@/hurumap/core/assets/Facebook.svg";
import { ReactComponent as LinkedInIcon } from "@/hurumap/core/assets/LinkedIn.svg";
import { ReactComponent as TwitterIcon } from "@/hurumap/core/assets/Twitter.svg";
import { ReactComponent as WhatsAppIcon } from "@/hurumap/core/assets/WhatsApp.svg";

const componentMap = {
  Facebook: { icon: FacebookIcon, button: FacebookShareButton },
  Twitter: { icon: TwitterIcon, button: TwitterShareButton },
  LinkedIn: { icon: LinkedInIcon, button: LinkedinShareButton },
  WhatsApp: { icon: WhatsAppIcon, button: WhatsappShareButton },
  Email: { icon: EmailIcon, button: EmailShareButton },
};

function ShareButton({ name, url, ...props }) {
  const SocialButtonComponent = componentMap[name].button;
  const SocialIcon = componentMap[name].icon;

  return (
    <SocialButtonComponent
      url={url}
      {...props}
      sx={(theme) => ({
        backgroundColor: `${theme.palette.background.default} !important`,
        filter: "opacity(0.6)",
        width: "100%",
        border: `solid 1px ${theme.palette.background.paper} !important`,
        paddingTop: `${theme.typography.pxToRem(5)} !important`,
        "&:hover": {
          border: "solid 1px #666666 !important",
          backgroundColor: `${theme.palette.grey.light} !important`,
        },
      })}
    >
      <SocialIcon />
    </SocialButtonComponent>
  );
}

export default ShareButton;
