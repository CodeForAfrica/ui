import { Typography, Grid, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import badgeIcon from "@/codeforafrica/assets/badge.svg?url";

const AccoladeBadgeRoot = styled(Grid, {
  slot: "Root",
})(({ theme }) => ({
  background: theme.palette.background.main,
  border: 0,
  margin: "1rem",
  color: "inherit",
  "&:hover": {
    background: theme.palette.background.main,
    border: 0,
  },
}));

const AccoladeBadge = React.forwardRef(function AccoladeBadge(props, ref) {
  const { name, date, ...other } = props;

  return (
    <AccoladeBadgeRoot
      container
      ref={ref}
      {...other}
      sx={{
        padding: "10px 0px",
      }}
    >
      <Grid item>
        <Box
          sx={{
            width: { xs: "32px", md: "64px" },
            height: { xs: "32px", md: "64px" },
            position: "relative",
          }}
        >
          <Image src={badgeIcon} alt="accolade-badge-icon" layout="fill" />
        </Box>
      </Grid>
      <Grid item>
        <Grid
          container
          flexDirection={{ xs: "row", md: "column" }}
          alignItems={{ xs: "center", md: "flex-start" }}
        >
          <Typography
            variant="subtitle1"
            sx={{ fontSize: { xs: "14px", md: "18px", margin: "0rem 1rem" } }}
          >
            {name}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ fontSize: { xs: "12px", md: "14px" }, margin: "0rem 1rem" }}
          >
            {date}
          </Typography>
        </Grid>
      </Grid>
    </AccoladeBadgeRoot>
  );
});

AccoladeBadge.propTypes = {
  name: PropTypes.string,
  date: PropTypes.string,
};

AccoladeBadge.defaultProps = {
  name: undefined,
  date: undefined,
};

export default AccoladeBadge;
