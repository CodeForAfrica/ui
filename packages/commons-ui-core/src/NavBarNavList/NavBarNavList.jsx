import React from "react";

import NavList from "@/commons-ui/core/NavList";
import NavListItem from "@/commons-ui/core/NavListItem";
import SocialMediaIconLink from "@/commons-ui/core/SocialMediaIconLink";

const NavBarNavList = React.forwardRef(function NavBarNavList(props, ref) {
  const {
    slotProps: { item: ItemProps, typography } = {},
    direction,
    menus,
    socialLinks,
    Component,
    children,
    ...other
  } = props;

  if (!menus?.length) {
    return null;
  }
  return (
    <NavList direction={direction} {...other} ref={ref}>
      {menus.map((item) => (
        <NavListItem
          key={item.label}
          {...ItemProps}
          sx={[
            {
              mb: { xs: 2.5, md: 0 },
              mr: { xs: 0, md: 2.5 },
            },
            ...(Array.isArray(ItemProps?.sx) ? ItemProps.sx : [ItemProps?.sx]),
          ]}
        >
          <Component
            color="inherit"
            underline="none"
            // in mobile h3 = h4 in desktop
            variant="h3"
            {...typography}
            href={item.href}
            sx={[
              {
                typography: { md: "body3" },
                "&:hover, &:active, &:focus, &:focus-within": {
                  textDecoration: "none",
                  color: { xs: "inherit", md: "primary.main" },
                },
              },
              ...(Array.isArray(typography?.sx)
                ? typography.sx
                : [typography?.sx]),
            ]}
          >
            {item.label}
          </Component>
        </NavListItem>
      ))}
      {children}
      {socialLinks?.map(({ platform, url }) => {
        return (
          <NavListItem key={platform}>
            <SocialMediaIconLink
              component={Component}
              href={url}
              platform={platform}
              IconProps={{
                mt: direction === "column" ? 0 : 1,
              }}
              sx={{
                typography: { md: "h5" },
              }}
            />
          </NavListItem>
        );
      })}
    </NavList>
  );
});

export default NavBarNavList;
