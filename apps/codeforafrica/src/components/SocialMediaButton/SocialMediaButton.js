/* eslint-env browser */
import { Link } from "@commons-ui/next";
import { SvgIcon } from "@mui/material";
import React from "react";

import FacebookIcon from "@/codeforafrica/assets/icons/Type=facebook, Size=24, Color=CurrentColor.svg";
import GithubIcon from "@/codeforafrica/assets/icons/Type=github, Size=24, Color=CurrentColor.svg";
import InstagramIcon from "@/codeforafrica/assets/icons/Type=instagram, Size=24, Color=CurrentColor.svg";
import LinkedinIcon from "@/codeforafrica/assets/icons/Type=linkedin, Size=24, Color=CurrentColor.svg";
import SlackIcon from "@/codeforafrica/assets/icons/Type=slack, Size=24, Color=CurrentColor.svg";
import TwitterIcon from "@/codeforafrica/assets/icons/Type=twitter, Size=24, Color=CurrentColor.svg";
import TooltipButton from "@/codeforafrica/components/TooltipButton";

const ICON_BY_NAME = {
  facebook: FacebookIcon,
  linkedin: LinkedinIcon,
  twitter: TwitterIcon,
  github: GithubIcon,
  instagram: InstagramIcon,
  slack: SlackIcon,
};

const SocialMediaButton = React.forwardRef(
  function SocialMediaButton(props, ref) {
    const { component: componentProp, name, url } = props;
    const component = componentProp || Link;
    const tooltipProps = {
      title: name,
    };

    const Icon = ICON_BY_NAME[name?.toLowerCase()];
    if (!Icon) {
      return null;
    }
    return (
      <TooltipButton
        component={component}
        href={url}
        tooltipProps={tooltipProps}
        sx={{
          color: "inherit",
        }}
        ref={ref}
      >
        <SvgIcon sx={{ fill: "none" }} component={Icon} />
      </TooltipButton>
    );
  },
);

export default SocialMediaButton;
