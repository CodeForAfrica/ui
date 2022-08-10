/* eslint-env browser */
import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

import FacebookIcon from "@/codeforafrica/assets/icons/Type=facebook, Size=24, Color=CurrentColor.svg";
import GithubIcon from "@/codeforafrica/assets/icons/Type=github, Size=24, Color=CurrentColor.svg";
import InstagramIcon from "@/codeforafrica/assets/icons/Type=instagram, Size=32, Color=White.svg";
import LinkedinIcon from "@/codeforafrica/assets/icons/Type=linkedin, Size=24, Color=CurrentColor.svg";
import SlackIcon from "@/codeforafrica/assets/icons/Type=slack, Size=64, Color=CurrentColor.svg";
import TwitterIcon from "@/codeforafrica/assets/icons/Type=twitter, Size=24, Color=CurrentColor.svg";
import SocialMediaButton from "@/codeforafrica/components/SocialMediaButton";

function getButtonIcon(name) {
  switch (name) {
    case "facebook":
      return <SvgIcon sx={{ fill: "none" }} component={FacebookIcon} />;
    case "linkedin":
      return <SvgIcon sx={{ fill: "none" }} component={LinkedinIcon} />;
    case "twitter":
      return <SvgIcon sx={{ fill: "none" }} component={TwitterIcon} />;
    case "github":
      return <SvgIcon sx={{ fill: "none" }} component={GithubIcon} />;
    case "instagram":
      return <SvgIcon sx={{ fill: "none" }} component={InstagramIcon} />;
    case "slack":
      return <SvgIcon sx={{ fill: "none" }} component={SlackIcon} />;
    default:
      // TODO: if no icon found, return a generic icon ?
      return null;
  }
}

const SocialMediaConnectButton = React.forwardRef(
  function SocialMediaConnectButton(props, ref) {
    const { name, url } = props;
    const tooltipProps = {
      title: name,
    };

    const children = getButtonIcon(name.toLowerCase());

    return (
      <SocialMediaButton
        href={url}
        tooltipProps={tooltipProps}
        ref={ref}
        target="_blank"
      >
        {children}
      </SocialMediaButton>
    );
  }
);

export default SocialMediaConnectButton;
