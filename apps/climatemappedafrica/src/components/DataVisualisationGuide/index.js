import { RichTypography } from "@commons-ui/core";
import { useMediaQuery, Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import Card from "@/climatemappedafrica/components/Card";
import Carousel from "@/climatemappedafrica/components/Carousel";
import Section from "@/climatemappedafrica/components/Section";

function DataVisualisationGuide({ title, items }) {
  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  if (!items?.length) {
    return null;
  }
  return (
    <Box
      sx={(theme) => ({
        padding: `${theme.typography.pxToRem(40)} 0`,
      })}
    >
      <Section>
        <RichTypography component="h4" variant="h4">
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
                sx={{
                  marginTop: "40px",
                  "& .bold": {
                    fontWeight: "bold",
                  },
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
          <Grid
            container
            direction={{ xs: "column", md: "row" }}
            justifyContent={{ md: "space-between" }}
          >
            {items.map((item) => (
              <Grid item xs={12} key={item.id}>
                <Card
                  {...item}
                  sx={(theme) => ({
                    marginTop: theme.typography.pxToRem(40),
                    "& .bold": {
                      fontWeight: "bold",
                    },
                  })}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Section>
    </Box>
  );
}

DataVisualisationGuide.propTypes = {
  title: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string || PropTypes.array,
      image: PropTypes.string,
    }),
  ),
};

export default DataVisualisationGuide;