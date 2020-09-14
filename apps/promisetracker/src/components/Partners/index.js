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

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  root: {
    backgroundColor: palette.secondary.light,
    padding: "2rem 0rem",
  },
  partner: {
    maxWidth: "100%",
    [breakpoints.up("md")]: {
      height: "8rem",
    },
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
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Typography className={classes.title} variant="body1">
          Partners
        </Typography>
      </Grid>
      {partners.slice(0, 6).map((partner) => {
        return (
          <Grid className={classes.partnerContainer} item xs={6} md={4}>
            <img
              src={partner.logo}
              alt={partner.name}
              className={classes.partner}
            />
          </Grid>
        );
      })}
    </Grid>
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
