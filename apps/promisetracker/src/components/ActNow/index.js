import React from "react";
import PropTypes from "prop-types";

import { Grid, Typography, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { Section } from "@commons-ui/core";

import CtAButton from "@/promisetracker/components/CtAButton";
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
    textTransform: "capitalize",
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
  cta: {
    marginBottom: 0,
    [breakpoints.up("lg")]: {
      justifyContent: "left",
      padding: 0,
    },
  },
  ctaButton: {
    minWidth: typography.pxToRem(138),
    [breakpoints.up("lg")]: {
      minWidth: typography.pxToRem(158),
    },
  },
  description: {
    padding: "1rem 0rem 1.5rem 0rem",
    textAlign: "left",
    [breakpoints.up("lg")]: {
      lineHeight: "1.875rem",
    },
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

function ActNow({ actionLabel, description, title, ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();
  const descriptionVariant = useMediaQuery(theme.breakpoints.up("lg"))
    ? "body1"
    : "body2";

  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Grid container className={classes.content}>
          <Grid item xs={12} lg={6} container alignItems="center">
            <div className={classes.textContainer}>
              <Typography variant="h1" className={classes.title}>
                {title}
              </Typography>
              <Typography
                variant={descriptionVariant}
                className={classes.description}
              >
                {description}
              </Typography>
              <CtAButton
                classes={{
                  root: classes.cta,
                  button: classes.ctaButton,
                }}
              >
                {actionLabel}
              </CtAButton>
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
ActNow.propTypes = {
  actionLabel: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string,
};

ActNow.defaultProps = {
  actionLabel: undefined,
  description: undefined,
  title: undefined,
};

export default ActNow;
