import { Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

import badgeIcon from "@/codeforafrica/assets/badge.svg?url";
import NextImageButton from "@/codeforafrica/components/NextImageButton";

const BadgeButtonRoot = styled(Button, {
  slot: "Root",
})(() => ({
  background: "#F6F5F5",
  border: 0,
  color: "inherit",
  padding: "10px",
  gap: "10px",
  width: "201px",
  height: "84px",
  "&:hover": {
    background: "#F6F5F5",
    border: 0,
    padding: "10px",
    gap: "10px",
    width: "201px",
    height: "84px",
  },
}));

const Badge = React.forwardRef(function Badge(props, ref) {
  const { name, date, ...other } = props;

  return (
    <BadgeButtonRoot
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
      <Typography
        sx={{
          display: "flex",
          flexDirection: { xs: "row", md: "column" },
          textTransform: "capitalize",
          color: "black",
        }}
      >
        <span sx={{ fontSize: "18px" }}>{name}</span>
        <span sx={{ fontSize: "14px" }}>{date}</span>
      </Typography>
    </BadgeButtonRoot>
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
