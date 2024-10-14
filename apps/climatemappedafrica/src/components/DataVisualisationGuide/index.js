import { RichTypography } from "@commons-ui/core";
import { Box, Grid, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import Card from "@/climatemappedafrica/components/Card";
import Carousel from "@/climatemappedafrica/components/Carousel";
import Section from "@/climatemappedafrica/components/Section";

function DataVisualisationGuide({ title, items, ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  if (!items?.length) {
    return null;
  }
  return (
    <div className={classes.root}>
      <Section className={classes.section}>
        <RichTypography component="h4" variant="h4" className={classes.title}>
          {title}
        </RichTypography>
        <Box
          sx={{
            display: {
              xs: "none",
              md: "block",
            },
          }}
        >
          <Carousel showDots={!isDesktop}>
            {items.map((item) => (
              <Card
                key={item.id}
                {...item}
                classes={{
                  root: classes.card,
                  contentDescription: classes.cardContentDescription,
                }}
              />
            ))}
          </Carousel>
        </Box>
        <Box
          sx={{
            display: {
              xs: "block",
              md: "none",
            },
          }}
        >
          <Grid container className={classes.container}>
            {items.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Card
                  {...item}
                  classes={{
                    root: classes.card,
                    contentDescription: classes.cardContentDescription,
                  }}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Section>
    </div>
  );
}

DataVisualisationGuide.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      image: PropTypes.string,
    }),
  ),
};

export default DataVisualisationGuide;
