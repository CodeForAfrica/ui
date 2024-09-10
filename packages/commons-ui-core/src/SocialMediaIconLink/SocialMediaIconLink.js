import PropTypes from "prop-types";
import React from "react";

import IconLink from "./IconLink";

import FacebookIcon from "@/commons-ui/core/assets/icons/Type=facebook, Size=24, Color=CurrentColor.svg";
import GitHubIcon from "@/commons-ui/core/assets/icons/Type=github, Size=24, Color=CurrentColor.svg";
import InstagramIcon from "@/commons-ui/core/assets/icons/Type=instagram, Size=24, Color=CurrentColor.svg";
import LinkedInIcon from "@/commons-ui/core/assets/icons/Type=linkedin, Size=24, Color=CurrentColor.svg";
import SlackIcon from "@/commons-ui/core/assets/icons/Type=slack, Size=24, Color=CurrentColor.svg";
import TwitterIcon from "@/commons-ui/core/assets/icons/Type=twitter, Size=24, Color=CurrentColor.svg";

const platformToIconMap = {
  Facebook: FacebookIcon,
  Twitter: TwitterIcon,
  Instagram: InstagramIcon,
  Linkedin: LinkedInIcon,
  Github: GitHubIcon,
  Slack: SlackIcon,
};

const SocialMediaIconLink = React.forwardRef(function SocialMediaIconLink(
  { IconProps, chidlren: childrenProp, href, platform, ...props },
  ref,
) {
  if (!href?.length) {
    return null;
  }

  let children = childrenProp;
  if (!children) {
    const Icon = platform && platformToIconMap[platform];
    if (Icon) {
      children = <Icon />;
    }
  }

  if (!children) {
    return null;
  }
  return (
    <IconLink
      color="inherit"
      {...props}
      href={href}
      IconProps={{
        sx: {
          fill: "none",
        },
      }}
      sx={{
        display: "block",
        pr: "10px",
        ":last-of-type": {
          pr: 0,
        },
        ...props?.sx,
      }}
      ref={ref}
    >
      {children}
    </IconLink>
  );
});

SocialMediaIconLink.propTypes = {
  IconProps: PropTypes.shape({}),
  children: PropTypes.node,
  href: PropTypes.string.isRequired,
  platform: PropTypes.string,
};

export default SocialMediaIconLink;
