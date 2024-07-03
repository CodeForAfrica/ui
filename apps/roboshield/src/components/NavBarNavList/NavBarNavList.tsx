import { NavList } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { LinkProps, SvgIcon } from "@mui/material";
import React, { ElementType, FC } from "react";

import NavListItem from "@/roboshield/components/NavListItem";
import SocialMediaLinkIcon from "@/roboshield/components/SocialMediaLinkIcon";
import type { SocialMediaLink } from "@/roboshield/components/SocialMediaLinkIcon";

interface NavListItemProps extends LinkProps {}

interface Menu {
  label: string;
  href: string;
}

interface Props {
  NavListItemProps?: NavListItemProps;
  direction?: string;
  menus?: Menu[];
  socialLinks?: SocialMediaLink[];
}

const NavBarNavList: FC<Props> = React.forwardRef(
  function NavBarNavList(props, ref) {
    const { NavListItemProps, direction, menus, socialLinks, ...other } = props;

    return (
      <NavList direction={direction} {...other} ref={ref}>
        {menus?.map((item) => (
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
          return (
            <NavListItem key={platform}>
              <SocialMediaLinkIcon
                url={url}
                platform={platform}
                variant="h3"
                IconProps={{
                  fontSize: "inherit",
                  sx: {
                    fill: { xs: "none" },
                    mt: direction === "column" ? 0 : 1,
                  },
                }}
                sx={{
                  color: { xs: "inherit" },
                  typography: { md: "h5" },
                }}
              />
            </NavListItem>
          );
        })}
      </NavList>
    );
  },
);

export default NavBarNavList;
