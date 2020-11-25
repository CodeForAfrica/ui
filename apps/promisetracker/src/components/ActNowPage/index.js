import React from "react";
import PropTypes from "prop-types";

import { Grid, Typography, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Section } from "@commons-ui/core";

import actNowImg from "@/promisetracker/assets/illo-actNow@2x.png";

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  section: {},
  root: {
    backgroundColor: "#ebebeb",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: typography.pxToRem(53),
    paddingTop: typography.pxToRem(45),
  },
  title: {
    padding: 0,
    textAlign: "left",
  },
  titleRoot: {
    "&::after": {
      content: "''",
      display: "block",
      height: "0.2em",
      width: "12%",
      borderBottom: "solid 5px",
    },
  },
  content: {
    alignItems: "center",
    flexDirection: "column-reverse",
    justifyContent: "center",
    [breakpoints.up("lg")]: {
      alignItems: "stretch",
      flexDirection: "row",
      justifyContent: "space-between",
    },
  },
  description: {
    padding: "1rem 0rem 1.5rem 0rem",
    textAlign: "left",
  },
  image: {
    maxWidth: typography.pxToRem(314),
    minWidth: typography.pxToRem(314),
    objectFit: "cover",
    [breakpoints.up("lg")]: {
      maxWidth: typography.pxToRem(484),
      minWidth: typography.pxToRem(484),
    },
  },
  textContainer: {
    marginTop: typography.pxToRem(19),
    [breakpoints.up("lg")]: {
      marginTop: 0,
    },
  },
}));

function ActNowPage({ title, description, ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();
  const descriptionVariant = useMediaQuery(theme.breakpoints.up("lg"))
    ? "body1"
    : "body2";

  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Grid container className={classes.content}>
          <Grid item xs={12} lg={7} container alignItems="center">
            <div className={classes.textContainer}>
              <Typography
                variant="h2"
                className={classes.title}
                classes={{ root: classes.titleRoot }}
              >
                {title}
              </Typography>
              <div />
              <Typography
                variant={descriptionVariant}
                className={classes.description}
              >
                {description}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} lg={5}>
            <img src={actNowImg} alt="Act Now" className={classes.image} />
          </Grid>
        </Grid>
      </Section>
    </div>
  );
}
ActNowPage.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
};

ActNowPage.defaultProps = {
  description: null,
  title: null,
};

export default ActNowPage;
