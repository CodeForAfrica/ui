import { Link } from "@commons-ui/next";
import IconButton from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import SvgIcon from "@mui/material/SvgIcon";
import React from "react";

import ArrowDropDownIcon from "@/charterafrica/assets/icons/Type=chevron-down, Size=16, Color=White.svg";
import ArrowDropUpIcon from "@/charterafrica/assets/icons/Type=chevron-up, Size=16, Color=White.svg";
import { neutral } from "@/charterafrica/colors";

function NavBarDropdown({ menu }) {
  const [open, setOpen] = React.useState(false);
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
  const ArrowIcon = open ? ArrowDropUpIcon : ArrowDropDownIcon;

  return (
    <>
      <Link
        href={menu.href || "#"}
        color="text.secondary"
        underline="none"
        variant="p3SemiBold"
        sx={{
          display: "flex",
          gap: 0.625,
          p: 1.25,
        }}
        ref={anchorRef}
      >
        {menu.label}
        {menu.children ? (
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
            <SvgIcon
              component={ArrowIcon}
              viewBox="0 0 16 16"
              sx={{
                color: "text.secondary",
                display: "inline-flex",
                fill: "none",
              }}
            />
          </IconButton>
        ) : null}
      </Link>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        placement="bottom-start"
        role={undefined}
        transition
        disablePortal
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [10, 0],
            },
          },
        ]}
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
              width: "200px",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  autoFocusItem
                  component="nav"
                  disableGutters
                  sx={{
                    border: 1,
                    borderColor: neutral[800],
                    background: neutral[50],
                    p: 0,
                  }}
                >
                  {menu?.children.map((option, index) => (
                    <MenuItem
                      color="inherit"
                      component={Link}
                      onClick={handleClickMenuItem}
                      href={menu.children[index].href || "#"}
                      underline="none"
                      variant="caption"
                      sx={{
                        borderBottom: 1,
                        borderColor: neutral[800],
                        background: neutral[50],
                        color: neutral[900],
                        p: 1.25,
                        "&:hover": {
                          background: neutral[100],
                        },
                        "&:last-of-type": {
                          borderBottom: "none",
                        },
                      }}
                      key={option.label}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
}

export default NavBarDropdown;
