import {
  Box,
  ButtonBase,
  ClickAwayListener,
  Fade,
  IconButton,
  Paper,
  Popper,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

const Action = React.forwardRef(function Action(
  {
    ButtonProps,
    HeaderProps,
    PaperProps,
    PopperProps,
    TooltipProps,
    children,
    header,
    icon,
    title,
    id,
    ...props
  },
  ref,
) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box ref={ref} {...props}>
      <Tooltip title={title} {...TooltipProps}>
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
        {...PopperProps}
        sx={(theme) => ({
          zIndex: theme.zIndex.drawer,
          ...PopperProps?.sx,
        })}
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            {/* Fix: https://github.com/mui/material-ui/issues/27154#issuecomment-1117386458  */}
            <div>
              <ClickAwayListener onClickAway={handleClose}>
                <Paper
                  {...PaperProps}
                  sx={(theme) => ({
                    background: theme.palette.background.default,
                    border: `1px solid ${theme.palette.grey.light}`,
                    width: theme.typography.pxToRem(180),
                    boxShadow: "0px 3px 6px #00000029",
                    borderRadius: 0,
                    marginTop: theme.typography.pxToRem(-40),
                    ...PaperProps?.sx,
                  })}
                >
                  <ButtonBase
                    onClick={handleClose}
                    {...ButtonProps}
                    sx={(theme) => ({
                      background: theme.palette.background.paper,
                      height: theme.typography.pxToRem(36),
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      width: "100%",
                      paddingLeft: theme.typography.pxToRem(16),
                      paddingRight: theme.typography.pxToRem(10),
                      ...ButtonProps?.sx,
                    })}
                  >
                    <Typography
                      {...HeaderProps}
                      sx={(theme) => ({
                        fontSize: theme.typography.pxToRem(11),
                        lineHeight: 17 / 11,
                        color: "#666666",
                        ...HeaderProps?.sx,
                      })}
                    >
                      {header}
                    </Typography>
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
});

export default Action;
