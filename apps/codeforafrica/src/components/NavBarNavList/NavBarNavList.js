import { NavList } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { SvgIcon } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import FacebookIcon from "@/codeforafrica/assets/icons/Type=facebook, Size=24, Color=CurrentColor.svg";
import GitHubIcon from "@/codeforafrica/assets/icons/Type=github, Size=24, Color=CurrentColor.svg";
import InstagramIcon from "@/codeforafrica/assets/icons/Type=instagram, Size=24, Color=CurrentColor.svg";
import LinkedInIcon from "@/codeforafrica/assets/icons/Type=linkedin, Size=24, Color=CurrentColor.svg";
import SlackIcon from "@/codeforafrica/assets/icons/Type=slack, Size=24, Color=CurrentColor.svg";
import TwitterIcon from "@/codeforafrica/assets/icons/Type=twitter, Size=24, Color=CurrentColor.svg";
import NavListItem from "@/codeforafrica/components/NavListItem";

const platformToIconMap = {
  Facebook: FacebookIcon,
  Twitter: TwitterIcon,
  Instagram: InstagramIcon,
  Linkedin: LinkedInIcon,
  Github: GitHubIcon,
  Slack: SlackIcon,
};

const NavBarNavList = React.forwardRef(function NavBarNavList(props, ref) {
  const { direction, menus, socialLinks, ...other } = props;

  if (!menus?.length) {
    return null;
  }
  return (
    <NavList direction={direction} {...other} ref={ref}>
      {menus.map((item) => (
        <NavListItem key={item.label} sx={{ m: "20px" }}>
          <Link
            href={item.href}
            color="inherit"
            underline="none"
            variant="h4"
            sx={{
              typography: { md: "body3" },
              "&:hover, &:active, &:focus, &:focus-within": {
                textDecoration: "none",
                color: { xs: "inherit", md: "primary.main" },
              },
            }}
          >
            {item.label}
          </Link>
        </NavListItem>
      ))}
      {socialLinks?.map(({ platform, url }) => {
        const Icon = platformToIconMap[platform];
        if (!Icon) {
          return null;
        }
        return (
          <NavListItem key={platform} sx={{ m: "20px", mr: 0 }}>
            <Link href={url} sx={{ color: { xs: "inherit" } }}>
              <SvgIcon
                component={Icon}
                sx={{
                  mt: direction === "column" ? 0 : 1,
                  fill: { xs: "none" },
                }}
              />
            </Link>
          </NavListItem>
        );
      })}
    </NavList>
  );
});

NavBarNavList.propTypes = {
  direction: PropTypes.string,
  menus: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    }),
  ),
};

NavBarNavList.defaultProps = {
  direction: undefined,
  menus: undefined,
};

export default NavBarNavList;
