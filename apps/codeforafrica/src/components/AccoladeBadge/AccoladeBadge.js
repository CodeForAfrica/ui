import { Box, Grid, SvgIcon, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

import BadgeIcon from "@/codeforafrica/assets/icons/Type=award, Size=64, Color=CurrentColor.svg";

const AccoladeBadgeRoot = styled(Box, {
  slot: "Root",
})(({ theme }) => ({
  background: theme.palette.background.main,
  padding: 5,
  [theme.breakpoints.up("md")]: {
    padding: 10,
  },
}));

const AccoladeBadge = React.forwardRef(function AccoladeBadge(props, ref) {
  const { date, name, sx, ...other } = props;

  return (
    <AccoladeBadgeRoot {...other} ref={ref}>
      <Grid container alignItems="center">
        <Grid item>
          <SvgIcon
            component={BadgeIcon}
            viewBox="0 0 64 64"
            sx={{
              color: "primary.main",
              display: "flex",
              fill: "none",
              fontSize: { xs: "32px", md: "64px" },
              ...sx,
            }}
          />
        </Grid>
        <Grid item>
          <Box
            sx={{
              pl: { xs: "10px", md: 0 },
              pr: { xs: 0, md: "10px" },
            }}
          >
            <Grid
              container
              flexDirection={{ xs: "row", md: "column" }}
              alignItems={{ xs: "center", md: "flex-start" }}
              spacing={{ xs: 2.5, md: "5px" }}
              justifyContent={{ xs: "space-around", md: "none" }}
            >
              <Grid item>
                <Typography
                  variant="body1"
                  sx={{
                    typography: { md: "body3" },
                  }}
                >
                  {name}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  variant="caption"
                  sx={{
                    typography: { md: "body1" },
                  }}
                >
                  {date}
                </Typography>
              </Grid>
            </Grid>
          </Box>
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
