/* eslint-env browser */
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";
import Tooltip from "@mui/material/Tooltip";
import React from "react";

import FacebookIcon from "@/codeforafrica/assets/icons/Type=facebook, Size=24, Color=CurrentColor.svg";
import GithubIcon from "@/codeforafrica/assets/icons/Type=github, Size=24, Color=CurrentColor.svg";
import InstagramIcon from "@/codeforafrica/assets/icons/Type=instagram, Size=32, Color=White.svg";
import LinkedinIcon from "@/codeforafrica/assets/icons/Type=linkedin, Size=24, Color=CurrentColor.svg";
import SlackIcon from "@/codeforafrica/assets/icons/Type=slack, Size=64, Color=CurrentColor.svg";
import TwitterIcon from "@/codeforafrica/assets/icons/Type=twitter, Size=24, Color=CurrentColor.svg";

function getButtonIcon(name) {
  switch (name) {
    case "facebook":
      return FacebookIcon;
    case "linkedin":
      return LinkedinIcon;
    case "twitter":
      return TwitterIcon;
    case "github":
      return GithubIcon;
    case "instagram":
      return InstagramIcon;
    case "slack":
      return SlackIcon;
    default:
      // TODO: if no icon found, return a generic icon ?
      return null;
  }
}

const SocialMediaConnectButton = React.forwardRef(
  function SocialMediaConnectButton(props, ref) {
    const { name, url } = props;
    return (
      <Tooltip title={name}>
        <IconButton href={url} target="_blank" ref={ref}>
          <SvgIcon sx={{ fill: "none" }} component={getButtonIcon(name)} />
        </IconButton>
      </Tooltip>
    );
  }
);

export default SocialMediaConnectButton;
