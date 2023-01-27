import { Link } from "@commons-ui/next";
import { Box, List, ListItemButton, ListSubheader } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

import { neutral } from "@/charterafrica/colors";

const NavBarNavMenu = React.forwardRef(function NavBarNavMenu(props, ref) {
  const { menus, sx } = props;
  const router = useRouter();
  const { pathname } = router;

  if (!menus?.length) {
    return null;
  }
  return (
    <Box
      color="text.secondary"
      display="flex"
      flex={1}
      flexDirection="column"
      sx={{
        rowGap: "20px",
        ...sx,
      }}
      ref={ref}
    >
      {menus.map((menu) => (
        <List
          component="nav"
          subheader={
            <ListSubheader
              color="inherit"
              component={Link}
              disableSticky
              href={menu.href || "#"}
              underline="none"
              variant="p3SemiBold"
              sx={{
                background: "inherit",
                borderRadius: "5px",
                display: "flex",
                flex: 1,
                p: 1.25,
                typography: "p3SemiBold",
              }}
            >
              {menu.label}
            </ListSubheader>
          }
          sx={{
            background: neutral[800],
            borderRadius: "5px",
            display: "flex",
            flex: 1,
            flexDirection: "column",
            p: 0,
          }}
          key={menu.label}
        >
          {menu.children?.map((item) => (
            <ListItemButton
              color="inherit"
              component={Link}
              href={item.href || "#"}
              underline="none"
              variant="caption"
              selected={item.href === pathname}
              disableGutters
              disablePadding
              sx={{
                borderBottom: 1,
                borderColor: neutral[800],
                background: neutral[50],
                color: neutral[900],
                p: 1.25,
                typography: "caption",
                "&.Mui-selected": {
                  background: neutral[100],
                },
                "&:hover": {
                  backgroundColor: neutral[200],
                },
                "&.Mui-selected:hover": {
                  backgroundColor: neutral[200],
                },
                "&:last-of-type": {
                  borderBottom: "none",
                },
              }}
              key={item.label}
            >
              {item.label}
            </ListItemButton>
          )) || null}
        </List>
      ))}
    </Box>
  );
});

export default NavBarNavMenu;
