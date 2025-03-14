import { Section } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    alignItems: "center",
    backgroundColor: palette.secondary.light,
    display: "flex",
    justifyContent: "center",
    padding: `${typography.pxToRem(43)} 0 ${typography.pxToRem(38)}`,
    [breakpoints.up("lg")]: {
      padding: `${typography.pxToRem(55)} 0 ${typography.pxToRem(66)}`,
    },
  },
  section: {},
  sectionTitle: {
    margin: 0,
    textAlign: "center",
    width: "100%",
    [breakpoints.up("lg")]: {
      textAlign: "left",
    },
  },
  partner: {
    display: "flex",
    height: typography.pxToRem(126.56),
    margin: "0 auto",
    width: typography.pxToRem(273.6),
    position: "relative",
    [breakpoints.up("lg")]: {
      height: typography.pxToRem(120),
      margin: 0,
      width: typography.pxToRem(260),
    },
  },
  partnerFirst: {
    marginLeft: 0,
    marginRight: "auto",
    [breakpoints.up("lg")]: {
      marginLeft: "auto",
      marginRight: 0,
    },
  },
  partnerLast: {
    marginLeft: "auto",
    marginRight: 0,
    [breakpoints.up("lg")]: {
      marginLeft: 0,
      marginRight: "auto",
    },
  },
  partnerLogo: {
    objectFit: "contain",
  },
  partnerMiddle: {
    margin: "0 auto",
  },
  partnerRow: {
    marginTop: typography.pxToRem(20),
    [breakpoints.up("lg")]: {
      marginTop: typography.pxToRem(41),
    },
  },
  partners: {},
  title: {},
}));

function Partners({ items, title, ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  if (!items?.length) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Section
        title={title}
        titleProps={{ variant: "h4" }}
        classes={{ root: classes.section, title: classes.sectionTitle }}
      >
        <Grid container justifyContent="center">
          <Grid item xs={12} lg={10}>
            <Grid
              container
              justifyContent={isDesktop ? "space-between" : "center"}
              className={classes.partners}
            >
              {items.slice(0, 6).map((partner) => (
                <Grid key={partner.name} item xs={12} lg="auto">
                  <Link href={partner.url} className={classes.partner}>
                    <Image
                      src={partner.image}
                      alt={partner.name}
                      fill
                      className={clsx(classes.partnerLogo, classes.partnerRow)}
                    />
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Section>
    </div>
  );
}

Partners.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
};

export default Partners;
