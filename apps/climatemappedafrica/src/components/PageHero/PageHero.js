import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import RichHeader from "@/climatemappedafrica/components/RichHeader";
import Section from "@/climatemappedafrica/components/Section";

function AboutHero({ background, overline, subtitle, title, ...props }) {
  const classes = useStyles(props);
  let backgroundSx;
  if (background?.src?.length) {
    backgroundSx = {
      background: `url('${background.src}')`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    };
  }

  return (
    <Box
      sx={{
        ...backgroundSx,
        margin: 0,
        position: "relative",
        "&:after": {
          content: "''",
          background: {
            xs: `linear-gradient(to right, #ffffffE6 0%, #ffffffE6 87.5%, transparent 87.5%, transparent 100%)`,
            md: `linear-gradient(to right, #ffffffE6 0%, #ffffffE6 62.5%, transparent 62.5%, transparent 100%)`,
            lg: `linear-gradient(to right, #ffffffE6 0%, #ffffffE6 56%, transparent 56%, transparent 100%)`,
          },
          position: "absolute",
          left: 0,
          top: { xs: "70px", lg: "100px" },
          bottom: { xs: "70px", lg: "100px" },
          width: "100%",
        },
      }}
    >
      <Section classes={{ root: classes.section }}>
        <Grid container>
          <Grid
            item
            xs={9}
            lg={6}
            sx={{
              height: "100%",
              py: { xs: "43px", md: "74px" },
            }}
          >
            <RichHeader
              SubtitleProps={{
                sx: {
                  mr: 0,
                  maxWidth: 376,
                },
              }}
              overline={overline}
              subtitle={subtitle}
            >
              {title}
            </RichHeader>
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
}

AboutHero.propTypes = {
  background: PropTypes.shape({}),
  overline: PropTypes.string,
  subtitle: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.arrayOf(PropTypes.shape({})),
};

export default AboutHero;
