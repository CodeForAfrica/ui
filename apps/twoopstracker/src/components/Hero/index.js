import { RichTypography } from "@commons-ui/core";
import { Button, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { useSession } from "next-auth/react";
import PropTypes from "prop-types";
import React from "react";

import backgroundImage from "@/twoopstracker/assets/images/banner background.png";
import Link from "@/twoopstracker/components/Link";
import Section from "@/twoopstracker/components/Section";

const useStyles = makeStyles(({ breakpoints, typography, palette }) => ({
  root: {
    backgroundImage: `url('${backgroundImage.src}')`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right bottom",
    width: "100%",
  },
  ctaContainer: {
    display: "flex",
    flexDirection: "column",
    marginTop: typography.pxToRem(40),
    [breakpoints.up("sm")]: {
      flexDirection: "row",
    },
    [breakpoints.up("lg")]: {
      marginTop: typography.pxToRem(80),
    },
  },
  button: {
    marginRight: 0,
    marginTop: typography.pxToRem(10),
    [breakpoints.up("sm")]: {
      marginRight: typography.pxToRem(40),
      marginTop: 0,
      "&:last-of-type": {
        marginRight: 0,
      },
    },
  },
  title: {
    maxWidth: "80%",
    [breakpoints.up("md")]: {
      width: typography.pxToRem(732),
    },
    [breakpoints.up("xl")]: {
      width: typography.pxToRem(1077),
    },
  },
  description: {
    color: palette.text.secondary,
    marginTop: typography.pxToRem(40),
    maxWidth: "70%",
    [breakpoints.up("md")]: {
      marginTop: typography.pxToRem(80),
      width: typography.pxToRem(966),
    },
  },
  section: {
    paddingTop: typography.pxToRem(60),
    paddingBottom: typography.pxToRem(60),
    [breakpoints.up("md")]: {
      paddingTop: typography.pxToRem(75),
      paddingBottom: typography.pxToRem(75),
    },
  },
}));

function Hero({ ctas, description, title, withCTA, ...props }) {
  const classes = useStyles(props);
  const { data: session } = useSession();

  return (
    <div className={classes.root}>
      <Section className={classes.section}>
        <Typography className={classes.title} variant="h1">
          {title}
        </Typography>
        <RichTypography className={classes.description} variant="subtitle1">
          {description}
        </RichTypography>
        {withCTA && (
          <div className={classes.ctaContainer}>
            {ctas.search ? (
              <Button
                component={Link}
                href={ctas.search.href}
                className={classes.button}
                variant="contained"
                color="primary"
                underline="none"
              >
                {ctas.search.label}
              </Button>
            ) : null}
            {!session && ctas.signUp ? (
              <Button
                component={Link}
                href={ctas.signUp.href}
                className={classes.button}
                variant="contained"
                color="primary"
                underline="none"
              >
                {ctas.signUp.label}
              </Button>
            ) : null}
          </div>
        )}
      </Section>
    </div>
  );
}

Hero.propTypes = {
  ctas: PropTypes.shape({
    search: PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
    signUp: PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  }),
  description: PropTypes.string,
  title: PropTypes.string,
  withCTA: PropTypes.bool,
};

Hero.defaultProps = {
  ctas: undefined,
  description: undefined,
  title: undefined,
  withCTA: true,
};

export default Hero;
