import { RichTypography } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { Grid } from "@mui/material";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

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
          component={Link}
          href={partner.url}
          underline="none"
          className={classes.partner}
        >
          <Grid item xs={12} container justifyContent="center">
            <figure className={classes.partnerFigure}>
              <Image
                src={partner.image}
                layout="fill"
                alt={partner.name}
                className={classes.partnerLogo}
              />
            </figure>
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
