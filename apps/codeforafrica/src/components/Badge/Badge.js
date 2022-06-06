import { Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import badgeIcon from "@/codeforafrica/assets/badge.svg?url";
import NextImageButton from "@/codeforafrica/components/NextImageButton";

const Badge = React.forwardRef(function Badge(props, ref) {
  const { name, date, ...other } = props;

  return (
    <Button
      variant="outlined"
      startIcon={
        <NextImageButton
          href="/"
          src={badgeIcon}
          alt="not badge"
          width="64px"
          height="64px"
        />
      }
      ref={ref}
      {...other}
    >
      <Typography sx={{ display: "flex", flexDirection: "column" }}>
        <span>{name}</span>
        <span>{date}</span>
      </Typography>
    </Button>
  );
});

Badge.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string,
};

Badge.defaultProps = {
  name: undefined,
  date: undefined,
};

export default Badge;
