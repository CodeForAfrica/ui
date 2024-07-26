import { Box, SvgIcon } from "@mui/material";
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
  Facebook: FacebookShareButton,
  Twitter: TwitterShareButton,
  LinkedIn: LinkedinShareButton,
  WhatsApp: WhatsappShareButton,
  Email: EmailShareButton,
  Telegram: TelegramShareButton,
  Pinterest: PinterestShareButton,
};

const ShareButton = React.forwardRef(function ShareButton({
  name,
  url,
  ButtonProps,
  icon,
  ...props
}) {
  const SocialButtonComponent = componentMap[name];

  if (!SocialButtonComponent) {
    return null;
  }

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
        <SvgIcon
          component={icon}
          sx={{
            width: "100%",
          }}
        />
      </SocialButtonComponent>
    </Box>
  );
});

export default ShareButton;
