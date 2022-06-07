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
  "&:hover": {
    background: "#F6F5F5",
    border: 0,
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
          alt="Badge icon"
          width="64px"
          height="64px"
          sx={{
            "& img": {
              width: { xs: "32px !important", md: "64px !important" },
            },
          }}
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
          textAlign: "start",
          "& span:nth-first-child(1)": {
            fontSize: { xs: "14px", md: "18px" },
            margin: "0rem 0.5rem",
          },
          "& span:nth-first-child(2)": {
            fontSize: { xs: "12px", md: "14px" },
            margin: "0rem 0.5rem",
          },
        }}
      >
        <span>{name}</span>
        <span>{date}</span>
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
