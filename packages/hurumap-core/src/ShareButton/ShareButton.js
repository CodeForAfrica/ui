import { Box, SvgIcon } from "@mui/material";
import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import {
  EmailShareButton,
  FacebookShareButton,
  FacebookMessengerShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  RedditShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";

const componentMap = {
  Email: EmailShareButton,
  Facebook: FacebookShareButton,
  FacebookMessenger: FacebookMessengerShareButton,
  LinkedIn: LinkedinShareButton,
  Pinterest: PinterestShareButton,
  Reddit: RedditShareButton,
  Telegram: TelegramShareButton,
  Twitter: TwitterShareButton,
  WhatsApp: WhatsappShareButton,
};

const ShareButton = React.forwardRef(function ShareButton(
  { ButtonProps, IconProps, icon, name, url, onCopy, ...props },
  ref,
) {
  const SocialButtonComponent = componentMap[name];

  if (!SocialButtonComponent && name !== "CopyUrl") {
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
      ref={ref}
    >
      {name === "CopyUrl" ? (
        <CopyToClipboard text={url} onCopy={onCopy} {...ButtonProps}>
          <SvgIcon
            component={icon}
            viewBox="0 0 24 24"
            {...IconProps}
            sx={{
              width: "100%",
              ...IconProps?.sx,
            }}
          />
        </CopyToClipboard>
      ) : (
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
      )}
    </Box>
  );
});

export default ShareButton;
