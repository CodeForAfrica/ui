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
  margin: "16px",
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
        padding: { xs: " 5px 0px;" },
        margin: "10px",
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
          sx={{ padding: "4.8px" }}
        >
          <Typography
            variant="body1"
            sx={{ typography: { md: "body3" }, margin: "0px 16px" } }}
          >
            {name}
          </Typography>
          <Typography
            variant="caption"
            sx={{ typography: { md: "body1" }, margin: "0px 16px" }}
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
