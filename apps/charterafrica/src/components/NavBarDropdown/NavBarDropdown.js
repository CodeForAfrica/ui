import { Link } from "@commons-ui/next";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Grow from "@mui/material/Grow";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Paper from "@mui/material/Paper";
import Popper from "@mui/material/Popper";
import * as React from "react";

import ArrowDropDownIcon from "@/charterafrica/assets/icons/Type=chevron-down, Size=16, Color=White.svg";
import ArrowDropUpIcon from "@/charterafrica/assets/icons/Type=chevron-up, Size=16, Color=White.svg";
import { neutral } from "@/charterafrica/colors";

export default function NavBarDropdown({ menu }) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <ButtonGroup
        variant="text"
        ref={anchorRef}
        aria-label={menu.title}
        style={{
          marginRight: "20px",
        }}
      >
        <Link
          href={menu.href || "#"}
          color="inherit"
          underline="none"
          variant="h4"
        >
          <Button
            style={{
              border: "none",
              color: neutral[50],
              padding: "0",
              fontWeight: "600",
              fontSize: "18px",
              lineHeight: " 22px",
            }}
          >
            {menu.title}
          </Button>
        </Link>
        {menu.children ? (
          <Button
            size="small"
            aria-controls={open ? "split-button-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-label="select merge strategy"
            aria-haspopup="menu"
            onClick={handleToggle}
            style={{
              border: "none",
              color: neutral[50],
              padding: "0",
            }}
          >
            {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </Button>
        ) : null}
      </ButtonGroup>
      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[
          {
            name: "offset",
            options: {
              offset: [15, 0],
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
              marginTop: "5px",
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList
                  id="split-button-menu"
                  autoFocusItem
                  style={{
                    paddingTop: "0px",
                    paddingBottom: "0px",
                  }}
                >
                  {menu?.children.map((option, index) => (
                    <Link
                      key={option.title}
                      href={menu.children[index].href || "#"}
                      color="inherit"
                      underline="none"
                      variant="h4"
                      sx={{
                        "&:hover": {
                          background: neutral[100],
                        },
                      }}
                    >
                      <MenuItem
                        key={option.title}
                        selected={index === selectedIndex}
                        onClick={(event) => handleMenuItemClick(event, index)}
                        style={{
                          border: "1px solid",
                          borderColor: neutral[800],
                          background: neutral[50],
                          color: neutral[900],
                          borderTop: index === 0 ? "1px solid" : "none",
                          fontWeight: "400",
                          fontSize: "12px",
                          lineHeight: "14px",
                          height: "34px",
                        }}
                      >
                        {option.title}
                      </MenuItem>
                    </Link>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );
}
