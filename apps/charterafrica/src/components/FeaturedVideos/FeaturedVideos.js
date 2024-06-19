import { RichTypography, Section } from "@commons-ui/core";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef } from "react";

import FeaturedVideoCard from "./FeaturedVideoCard";

const FeaturedVideos = forwardRef(function FeaturedVideos(props, ref) {
  const { sx, items, title, airedOnText } = props;
  return (
    <Box ref={ref} bgcolor="common.white" sx={sx}>
      <Section sx={{ px: { xs: 5, sm: 0 }, py: { xs: 5, md: 10 } }}>
        <RichTypography
          color="primary.dark"
          variant="h3Small"
          component="h3"
          sx={{ typography: { md: "h3" }, marginBottom: 3.5 }}
        >
          {title}
        </RichTypography>
        <Grid container spacing={3}>
          {items?.map((item) => (
            <Grid xs={12} sm={6} md={4} item key={item.id}>
              <FeaturedVideoCard {...item} airedOnText={airedOnText} />
            </Grid>
          ))}
        </Grid>
      </Section>
    </Box>
  );
});

FeaturedVideos.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
  airedOnText: PropTypes.string,
};

FeaturedVideos.defaultProps = {
  items: undefined,
  title: undefined,
  airedOnText: undefined,
};

export default FeaturedVideos;
