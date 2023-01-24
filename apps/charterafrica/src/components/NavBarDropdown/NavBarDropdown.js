import { Link } from "@commons-ui/next";
import { IconButton } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

import { neutral } from "@/charterafrica/colors";
import DropdownMenu from "@/charterafrica/components/DropdownMenu";
import OpenCloseIcon from "@/charterafrica/components/OpenCloseIcon";
import Popper from "@/charterafrica/components/Popper";

const NavBarDropdown = React.forwardRef(function NavBarDropdown(props, ref) {
  const { menu } = props;
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const { pathname } = router;
  const anchorRef = React.useRef(null);
  const handleClickArrow = (e) => {
    e.preventDefault();
    setOpen((prevOpen) => !prevOpen);
  };
  // TODO(kilemensi): Since we current don't have any of the child pages, we
  //                  have to manually hide the popup.
  //                  SHOULD BE REMOVED ONCE CHILD PAGES ARE IMPLEMENTED.
  const handleClickMenuItem = () => {
    setOpen(false);
  };
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <React.Fragment ref={ref}>
      <Link
        href={menu.href || "#"}
        color="text.secondary"
        underline="none"
        variant="p3SemiBold"
        sx={{
          display: "flex",
          gap: 0.625,
          p: 1.25,
          whiteSpace: "nowrap",
        }}
        ref={anchorRef}
      >
        {menu.label}
        {menu.children?.length ? (
          <IconButton
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleClickArrow}
            sx={{
              minWidth: 24,
              border: "none",
              color: neutral[50],
              padding: 0,
            }}
          >
            <OpenCloseIcon open={open} sx={{ color: "text.secondary" }} />
          </IconButton>
        ) : null}
      </Link>
      {menu?.children?.length ? (
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          role={undefined}
          modifiers={[
            {
              name: "offset",
              options: {
                offset: [10, 0],
              },
            },
          ]}
          ClickAwayListenerProps={{ onClickAway: handleClose }}
          TransitionComponentProps={{
            style: {
              transformOrigin: "center top",
              width: "200px",
            },
          }}
        >
          <DropdownMenu
            items={menu.children}
            onClick={handleClickMenuItem}
            selectedIndex={menu.children.findIndex((c) => c.href === pathname)}
          />
        </Popper>
      ) : null}
    </React.Fragment>
  );
});

export default NavBarDropdown;
