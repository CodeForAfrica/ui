import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import AccoladeBadge from "@/codeforafrica/components/AccoladeBadge";

const AccoladeBadgeList = React.forwardRef(function AccoladeBadgeList(
  props,
  ref
) {
  const { badges, ...other } = props;

  if (!badges?.length) {
    return null;
  }
  return (
    <Grid
      container
      spacing={{ xs: "10px", md: "29px" }}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        alignItems: "center",
        width: "100%",
      }}
      ref={ref}
      {...other}
    >
      {badges.map((item) => (
        <Grid item xs={12} sm={6} md={3} key={item.name}>
          <AccoladeBadge {...item} />
        </Grid>
      ))}
    </Grid>
  );
});

AccoladeBadgeList.propTypes = {
  badges: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      date: PropTypes.string,
    })
  ),
};

AccoladeBadgeList.defaultProps = {
  badges: undefined,
};
export default AccoladeBadgeList;
