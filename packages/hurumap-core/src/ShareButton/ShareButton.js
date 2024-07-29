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
  ButtonProps,
  IconProps,
  icon,
  name,
  url,
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
        ...props?.sx,
      }}
    >
      <SocialButtonComponent url={url} {...ButtonProps}>
        <SvgIcon
          component={icon}
          viewBox="0 0 24 24"
          {...IconProps}
          sx={{
            width: "100%",
            ...IconProps?.sx,
          }}
        />
      </SocialButtonComponent>
    </Box>
  );
});

export default ShareButton;
