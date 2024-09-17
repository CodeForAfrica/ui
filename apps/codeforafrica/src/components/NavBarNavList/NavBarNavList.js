import { NavList, NavListItem, SocialMediaIconLink } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import PropTypes from "prop-types";
import React from "react";

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
        return (
          <NavListItem key={platform}>
            <SocialMediaIconLink
              component={Link}
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

export default NavBarNavList;
