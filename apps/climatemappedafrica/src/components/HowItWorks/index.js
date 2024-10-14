import { Box, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

import Player from "@/climatemappedafrica/components/HowItWorks/Player";
import useStyles from "@/climatemappedafrica/components/HowItWorks/useStyles";
import Image from "@/climatemappedafrica/components/Image";
import Section from "@/climatemappedafrica/components/Section";

function HowItWorks({
  title,
  description,
  link,
  video,
  backgroundImage,
  foregroundImage,
  ...props
}) {
  const classes = useStyles(props);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <div className={classes.root}>
      <div className={classes.background}>
        <Image
          objectFit="cover"
          src={backgroundImage.src}
          layout="fill"
          unoptimized
        />
      </div>
      <Box
        sx={{
          display: {
            xs: "none",
            md: "block",
            lg: "none",
          },
        }}
      >
        <div className={classes.tabletWhite} />
      </Box>
      <Section classes={{ root: classes.section }}>
        <Grid container direction={isMobile ? "column-reverse" : "row"}>
          <Grid item xs={12} md={7} lg={6} className={classes.content}>
            <div className={classes.video}>
              <Player {...video} />
            </div>
            <Typography className={classes.title} variant="h4">
              {title}
            </Typography>
            <Typography variant="h6" className={classes.description}>
              {description}
            </Typography>
            <Button href={link.href} variant="text">
              {link.label}
            </Button>
          </Grid>
          <Grid item lg={1} />
          <Grid item xs={12} md={5} className={classes.visualsGrid}>
            <div className={classes.visuals}>
              <Image
                src={foregroundImage.src}
                layout="fill"
                objectFit="contain"
              />
            </div>
          </Grid>
        </Grid>
      </Section>
    </div>
  );
}

HowItWorks.propTypes = {
  ctaText: PropTypes.string,
  description: PropTypes.string,
  href: PropTypes.string,
  title: PropTypes.string,
};

export default HowItWorks;
