import { Link, RichTypography } from "@commons-ui/next";
import { Grid, SvgIcon } from "@mui/material";
import React from "react";

import FacebookIcon from "@/roboshield/assets/icons/Type=facebook, Size=24, Color=CurrentColor.svg";
import GitHubIcon from "@/roboshield/assets/icons/Type=github, Size=24, Color=CurrentColor.svg";
import InstagramIcon from "@/roboshield/assets/icons/Type=instagram, Size=24, Color=CurrentColor.svg";
import LinkedInIcon from "@/roboshield/assets/icons/Type=linkedin, Size=24, Color=CurrentColor.svg";
import SlackIcon from "@/roboshield/assets/icons/Type=slack, Size=24, Color=CurrentColor.svg";
import TwitterIcon from "@/roboshield/assets/icons/Type=twitter, Size=24, Color=CurrentColor.svg";

import LinkIcon from "./LinkIcon";
import type { LinkIconProps } from "./LinkIcon";

const platformToIconMap = new Map<string, any>();
platformToIconMap.set("Facebook", FacebookIcon);
platformToIconMap.set("Twitter", TwitterIcon);
platformToIconMap.set("Instagram", InstagramIcon);
platformToIconMap.set("Linkedin", LinkedInIcon);
platformToIconMap.set("Github", GitHubIcon);
platformToIconMap.set("Slack", SlackIcon);

type SocialMediaPlatform =
  | "Facebook"
  | "Github"
  | "Instagram"
  | "LinkedIn"
  | "Slack"
  | "Twitter";

interface SocialMediaLink {
  platform: SocialMediaPlatform;
  // TODO(koech): Confirm why we chose url instead of href in the CMS
  url: string;
}

interface SocialMediaLinkIconProps extends Omit<LinkIconProps, "href"> {
  platform: SocialMediaPlatform;
  url: string;
}

const SocialMediaLinkIcon = React.forwardRef(function SocialMediaLinkIcon(
  { IconProps, url, platform, ...props }: SocialMediaLinkIconProps,
  ref: React.ForwardedRef<HTMLAnchorElement>,
) {
  const Icon = platformToIconMap.get(platform);

  if (!Icon) {
    return null;
  }
  return (
    <LinkIcon
      {...props}
      IconProps={{
        component: Icon,
        ...IconProps,
      }}
      href={url}
    />
  );
});

export type { SocialMediaLink, SocialMediaLinkIconProps, SocialMediaPlatform };
export default SocialMediaLinkIcon;
