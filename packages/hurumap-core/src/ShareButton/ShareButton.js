import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import XIcon from "@mui/icons-material/X";
import { Box } from "@mui/material";
import React from "react";
import {
  TwitterShareButton,
  LinkedinShareButton,
  FacebookShareButton,
  EmailShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  PinterestShareButton,
} from "react-share";

const componentMap = {
  Facebook: { icon: FacebookIcon, button: FacebookShareButton },
  Twitter: { icon: XIcon, button: TwitterShareButton },
  LinkedIn: { icon: LinkedInIcon, button: LinkedinShareButton },
  WhatsApp: { icon: WhatsAppIcon, button: WhatsappShareButton },
  Email: { icon: EmailIcon, button: EmailShareButton },
  Telegram: { icon: TelegramIcon, button: TelegramShareButton },
  Pinterest: { icon: PinterestIcon, button: PinterestShareButton },
};

const ShareButton = React.forwardRef(function ShareButton({
  name,
  url,
  IconProps,
  ButtonProps,
  ...props
}) {
  const SocialButtonComponent = componentMap[name].button;
  const SocialIcon = componentMap[name].icon;

  return (
    <Box
      {...props}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...props.sx,
      }}
    >
      <SocialButtonComponent url={url} {...ButtonProps}>
        <SocialIcon {...IconProps} />
      </SocialButtonComponent>
    </Box>
  );
});

export default ShareButton;
