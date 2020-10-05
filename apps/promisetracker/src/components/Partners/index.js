import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { Grid, useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";

import { A, Section } from "@commons-ui/core";

import partner1 from "@/promisetracker/assets/partner-01.png";
import partner2 from "@/promisetracker/assets/partner-02.svg";
import partner3 from "@/promisetracker/assets/partner-03.svg";
import partner4 from "@/promisetracker/assets/partner-04.png";
import partner5 from "@/promisetracker/assets/partner-05.png";
import partner6 from "@/promisetracker/assets/partner-06.svg";

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
    height: typography.pxToRem(70),
    maxWidth: typography.pxToRem(153),
    minWidth: typography.pxToRem(153),
    [breakpoints.up("lg")]: {
      height: typography.pxToRem(119),
      maxWidth: typography.pxToRem(256),
      minWidth: typography.pxToRem(256),
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

  return (
    <div className={classes.root}>
      <Section
        title="Partners"
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
  items: [
    { logo: partner1, name: "PesaCheck", href: "//pesacheck.org" },
    { logo: partner2, name: "The Star", href: "//the-star.co.ke" },
    {
      logo: partner3,
      name: "Piga Firimbi",
      href: "//pigafirimbi.africauncensored.online",
    },
    {
      logo: partner4,
      name: "DW Akademie",
      href: "//www.dw.com/en/dw-akademie/about-us/s-9519",
    },
    { logo: partner5, name: "Meedan", href: "//meedan.com" },
    { logo: partner6, name: "AWS", href: "//aws.amazon.com" },
  ],
  title: undefined,
};

export default Partners;
