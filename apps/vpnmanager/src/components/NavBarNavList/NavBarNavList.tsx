import { NavList, NavListItem, SocialMediaIconLink } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import type { LinkProps } from "@mui/material";
import React from "react";
import UserAvatar from "../UserAvatar";

interface NavListItemProps extends LinkProps {}

interface Menu {
  label: string;
  href: string;
}

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

interface Props {
  NavListItemProps?: NavListItemProps;
  direction?: string;
  menus?: Menu[];
  socialLinks?: SocialMediaLink[];
}

const NavBarNavList = React.forwardRef(function NavBarNavList(
  props: Props,
  ref: React.ForwardedRef<HTMLDivElement>,
) {
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
          <NavListItem key={url}>
            <SocialMediaIconLink
              component={Link}
              href={url}
              platform={platform}
              variant="h3"
              IconProps={{
                fontSize: "inherit",
                sx: {
                  mt: direction === "column" ? 0 : 1,
                },
              }}
              sx={{
                typography: { md: "h5" },
              }}
            />
          </NavListItem>
        );
      })}
      <NavListItem>
        <UserAvatar />
      </NavListItem>
    </NavList>
  );
});

export type { Menu, SocialMediaPlatform, SocialMediaLink };
export default NavBarNavList;
