import React from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";
import { A, RichTypography } from "@commons-ui/core";

import useStyles from "./useStyles";

function Partners({ items, ...props }) {
  const classes = useStyles(props);

  if (!items?.length) {
    return null;
  }
  return (
    <Grid container>
      {items.map((partner) => (
        <Grid
          key={partner.name}
          item
          xs={12}
          container
          component={A}
          href={partner.href}
          underline="none"
          className={classes.partner}
        >
          <Grid item xs={12} container justify="center">
            <img
              src={partner.logo}
              alt={partner.name}
              className={classes.partnerLogo}
            />
          </Grid>
          <Grid item xs={12}>
            <RichTypography variant="h4" className={classes.partnerName}>
              {partner.name}
            </RichTypography>
          </Grid>
          <Grid item xs={12}>
            <RichTypography
              variant="body2"
              className={classes.partnerDescription}
            >
              {partner.description}
            </RichTypography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
}

Partners.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

Partners.defaultProps = {
  items: undefined,
};

export default Partners;
