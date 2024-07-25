import CloseIcon from "@mui/icons-material/Close";
import {
  Popper,
  Fade,
  Paper,
  ButtonBase,
  Typography,
  IconButton,
  ClickAwayListener,
  Tooltip,
  Box,
} from "@mui/material";
import React, { useState } from "react";

function Action({ children, header, icon, title, id, ...props }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box {...props}>
      <Tooltip title={title}>
        <IconButton
          onClick={handleClick}
          sx={{
            padding: 0,
          }}
          size="large"
        >
          {icon}
        </IconButton>
      </Tooltip>
      <Popper
        open={Boolean(anchorEl)}
        placement="bottom-end"
        anchorEl={anchorEl}
        transition
        sx={(theme) => ({
          zIndex: theme.zIndex.drawer,
        })}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <div>
              <ClickAwayListener onClickAway={handleClose}>
                <Paper
                  sx={(theme) => ({
                    background: theme.palette.background.default,
                    border: `1px solid ${theme.palette.grey.light}`,
                    width: theme.typography.pxToRem(180),
                    boxShadow: "0px 3px 6px #00000029",
                    borderRadius: 0,
                    marginTop: theme.typography.pxToRem(-40),
                  })}
                >
                  <ButtonBase
                    onClick={handleClose}
                    sx={(theme) => ({
                      background: theme.palette.background.paper,
                      height: theme.typography.pxToRem(36),
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      paddingLeft: theme.typography.pxToRem(16),
                      paddingRight: theme.typography.pxToRem(10),
                    })}
                  >
                    <Typography
                      sx={(theme) => ({
                        fontSize: theme.typography.pxToRem(11),
                        lineHeight: 17 / 11,
                        color: "#666666",
                      })}
                    >
                      {header}
                    </Typography>
                    <CloseIcon />
                  </ButtonBase>
                  {children}
                </Paper>
              </ClickAwayListener>
            </div>
          </Fade>
        )}
      </Popper>
    </Box>
  );
}

export default Action;
