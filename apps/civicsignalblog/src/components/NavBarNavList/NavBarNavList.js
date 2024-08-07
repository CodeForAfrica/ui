import { NavList } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { SvgIcon } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import FacebookIcon from "@/civicsignalblog/assets/icons/Type=facebook, Size=24, Color=CurrentColor.svg";
import GitHubIcon from "@/civicsignalblog/assets/icons/Type=github, Size=24, Color=CurrentColor.svg";
import InstagramIcon from "@/civicsignalblog/assets/icons/Type=instagram, Size=24, Color=CurrentColor.svg";
import LinkedInIcon from "@/civicsignalblog/assets/icons/Type=linkedin, Size=24, Color=CurrentColor.svg";
import SlackIcon from "@/civicsignalblog/assets/icons/Type=slack, Size=24, Color=CurrentColor.svg";
import TwitterIcon from "@/civicsignalblog/assets/icons/Type=twitter, Size=24, Color=CurrentColor.svg";
import NavListItem from "@/civicsignalblog/components/NavListItem";

const platformToIconMap = {
  Facebook: FacebookIcon,
  Twitter: TwitterIcon,
  Instagram: InstagramIcon,
  Linkedin: LinkedInIcon,
  Github: GitHubIcon,
  Slack: SlackIcon,
};

const NavBarNavList = React.forwardRef(function NavBarNavList(props, ref) {
  const { NavListItemProps, direction, menus, socialLinks, ...other } = props;

  if (!menus?.length) {
    return null;
  }
  return (
    <NavList direction={direction} {...other} ref={ref}>
      {menus.map((item) => (
        <NavListItem
          key={item.label}
          sx={{
            mb: { xs: 2.5, md: 0 },
            mr: { xs: 0, md: 2.5 },
          }}
        >
          <Link
            color="inherit"
            underline="none"
            // in mobile h3 = h4 in desktop
            variant="h3"
            {...NavListItemProps}
            href={item.href}
            sx={{
              typography: { md: "body3" },
              "&:hover, &:active, &:focus, &:focus-within": {
                textDecoration: "none",
                color: { xs: "inherit", md: "primary.main" },
              },
              ...NavListItemProps?.sx,
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
          <NavListItem key={platform}>
            <Link
              href={url}
              variant="h3"
              sx={{
                color: { xs: "inherit" },
                typography: { md: "h5" },
              }}
            >
              <SvgIcon
                component={Icon}
                fontSize="inherit"
                sx={{
                  fill: { xs: "none" },
                  mt: direction === "column" ? 0 : 1,
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
  NavListItemProps: PropTypes.shape({}),
  direction: PropTypes.string,
  menus: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    }),
  ),
};

NavBarNavList.defaultProps = {
  NavListItemProps: undefined,
  direction: undefined,
  menus: undefined,
};

export default NavBarNavList;
