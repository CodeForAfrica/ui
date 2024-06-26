import { useMediaQuery, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import Card from "@/pesayetu/components/Card";
import Header from "@/pesayetu/components/Header";
import Section from "@/pesayetu/components/Section";

function InsightsData({ title, overline, items, ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isTablet = useMediaQuery(theme.breakpoints.only("md"));

  if (!items?.length) {
    return null;
  }
  const itemsToShow = isTablet ? items.slice(0, 2) : items;
  return (
    <div className={classes.root}>
      <Section classes={{ root: classes.section }}>
        <Header
          overline={overline}
          classes={{ overline: classes.overline, title: classes.title }}
        >
          {title}
        </Header>
        <Grid container className={classes.list}>
          {itemsToShow.map(({ imageProps, ...item }) => (
            <Grid item lg={4} xs={12} md={6} key={item.href}>
              <Card imageProps={imageProps} {...item} />
            </Grid>
          ))}
        </Grid>
      </Section>
    </div>
  );
}

InsightsData.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      imageProps: PropTypes.shape({}),
    }),
  ),
  overline: PropTypes.string,
  title: PropTypes.string,
};

InsightsData.defaultProps = {
  items: undefined,
  overline: undefined,
  title: undefined,
};

export default InsightsData;
