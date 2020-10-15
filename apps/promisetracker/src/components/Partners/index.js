import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { Grid, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { A, Section } from "@commons-ui/core";

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
  },
  partner: {
    display: "flex",
    height: typography.pxToRem(72),
    minHeight: typography.pxToRem(72),
    maxHeight: typography.pxToRem(72),
    [breakpoints.up("lg")]: {
      height: typography.pxToRem(120),
      minHeight: typography.pxToRem(120),
      maxHeight: typography.pxToRem(120),
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
  partnerMiddle: {
    margin: "0 auto",
  },
  partnerRow: {
    marginTop: typography.pxToRem(20),
    [breakpoints.up("lg")]: {
      marginTop: typography.pxToRem(41),
    },
  },
  partners: {
    minWidth: typography.pxToRem(314),
    paddingTop: typography.pxToRem(47),
    [breakpoints.up("lg")]: {
      paddingTop: typography.pxToRem(41),
    },
  },
  title: {},
}));

function Partners({ items, title, ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const columnsCount = isDesktop ? 3 : 2;

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
        <Grid container className={classes.partners}>
          {items.slice(0, 6).map((partner, i) => (
            <Grid key={partner.name} item xs={6} lg={4}>
              <A href={partner.href}>
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className={clsx(classes.partner, {
                    [classes.partnerFirst]: (i + 1) % columnsCount === 1,
                    [classes.partnerLast]: (i + 1) % columnsCount === 0,
                    // center would never happen in mobile i.e any number % 2 is
                    // either 0 or 1
                    [classes.partnerMiddle]: (i + 1) % columnsCount === 2,
                    [classes.partnerRow]: i > columnsCount - 1,
                  })}
                />
              </A>
            </Grid>
          ))}
        </Grid>
      </Section>
    </div>
  );
}
Partners.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
};

Partners.defaultProps = {
  items: undefined,
  title: undefined,
};

export default Partners;
