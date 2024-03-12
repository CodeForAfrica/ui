import React, { ElementType, FC } from "react";

import GitHubIcon from "@/vpn-manager/assets/icons/Type=github, Size=24, Color=CurrentColor.svg";
import NavListItem from "@/vpn-manager/components/NavListItem";
import { NavList } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { LinkProps, SvgIcon } from "@mui/material";

const platformToIconMap: {
  [key: string]: ElementType<any>;
} = {
  Github: GitHubIcon,
};

interface NavListItemProps extends LinkProps {}

interface SocialLinks {
  platform: string;
  url: string;
}

interface Menu {
  label: string;
  href: string;
}

interface Props {
  NavListItemProps?: NavListItemProps;
  direction?: string;
  menus?: Menu[];
  socialLinks?: SocialLinks[];
}

const NavBarNavList: FC<Props> = React.forwardRef(
  function NavBarNavList(props, ref) {
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
  },
);

export default NavBarNavList;
