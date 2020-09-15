import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Typography } from "@material-ui/core";
import partner1 from "assets/partner-01.png";
import partner2 from "assets/partner-02.svg";
import partner3 from "assets/partner-03.svg";
import partner4 from "assets/partner-04.png";
import partner5 from "assets/partner-05.png";
import partner6 from "assets/partner-06.svg";

const useStyles = makeStyles(({ palette, breakpoints, widths }) => ({
  root: {
    backgroundColor: palette.secondary.light,
    padding: "2rem 0rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  partner: {
    maxWidth: "100%",
    height: "4.375rem",
    [breakpoints.up("md")]: {
      height: "7.5rem",
    },
  },
  content: {
    maxWidth: widths.values.lg,
  },
  title: {
    marginLeft: "2rem",
  },
  partnerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

function Partners({ partners, ...props }) {
  const classes = useStyles(props);

  return (
    <div className={classes.root}>
      <Grid container className={classes.content}>
        <Grid item xs={12}>
          <Typography className={classes.title} variant="h4">
            Partners
          </Typography>
        </Grid>
        {partners.slice(0, 6).map((partner) => (
          <Grid
            key={partner.name}
            className={classes.partnerContainer}
            item
            xs={6}
            md={4}
          >
            <img
              src={partner.logo}
              alt={partner.name}
              className={classes.partner}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
Partners.propTypes = {
  partners: PropTypes.arrayOf(PropTypes.shape({})),
};

Partners.defaultProps = {
  partners: [
    { logo: partner1, name: "PessaCheck" },
    { logo: partner2, name: "Star" },
    { logo: partner3, name: "Piga" },
    { logo: partner4, name: "DW" },
    { logo: partner5, name: "Meedan" },
    { logo: partner6, name: "AWS" },
  ],
};

export default Partners;
