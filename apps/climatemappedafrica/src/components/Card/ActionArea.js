import { Link } from "@commons-ui/next";
import { CardActionArea } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

function ActionArea({
  href,
  children,
  onClick,
  ActionAreaRootProps,
  FocusHighlightProps,
  FocusVisibleProps,
  ...props
}) {
  if (!(href || onClick)) {
    return children;
  }
  return (
    <CardActionArea
      component={href ? Link : undefined}
      color="textPrimary"
      underline="none"
      {...props}
      href={href}
      onClick={onClick}
      sx={{
        "& .MuiCardActionArea-root": {
          ...ActionAreaRootProps,
        },
        "& .MuiCardActionArea-focusHighlight": {
          background: "transparent",
          ...FocusHighlightProps,
        },
        "& .Mui-focusVisible": {
          ...FocusVisibleProps,
        },
      }}
    >
      {children}
    </CardActionArea>
  );
}

ActionArea.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
  onClick: PropTypes.func,
};

export default ActionArea;
