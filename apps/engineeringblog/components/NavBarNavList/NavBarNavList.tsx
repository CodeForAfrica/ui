import { NavList, NavListItem, SocialMediaIconLink } from "@commons-ui/core";
import { StyledLink as Link } from "@commons-ui/next";
import type { LinkProps } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import React from "react";

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
          sx={(theme: Theme) => ({
            borderBottom: {
              xs: `1px solid ${theme.palette.divider}`,
              md: "none",
            },
            py: { xs: 1, md: 0 },
            mr: { xs: 0, md: 2.5 },
          })}
        >
          <Link
            color="inherit"
            underline="none"
            // in mobile h3 = h4 in desktop
            variant="h5"
            {...NavListItemProps}
            href={item.href}
            sx={{
              display: "flex",
              flexBasis: { xs: 1, md: "auto" },
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
          <NavListItem
            sx={{
              py: { xs: 1, md: 0 },
            }}
            key={url}
          >
            <SocialMediaIconLink
              component={Link}
              href={url}
              platform={platform}
              variant="h5"
              IconProps={{
                fontSize: "inherit",
                sx: {
                  mt: direction === "column" ? 0 : 1,
                },
              }}
              sx={{
                display: "flex",
                typography: { md: "h5" },
              }}
            />
          </NavListItem>
        );
      })}
    </NavList>
  );
});

export type { Menu, SocialMediaLink, SocialMediaPlatform };
export default NavBarNavList;
