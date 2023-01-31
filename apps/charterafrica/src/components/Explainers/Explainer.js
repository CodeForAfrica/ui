import RichTypography from "@/commons-ui/core/RichTypography";
import { Figure } from "@commons-ui/next";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import RichText from "../RichText";

function Explainer({ image, description, title }) {
  return (
    <Grid container justifyContent="center">
      <Grid item xs={12}>
        <Box sx={{ maxHeight: image.height }}>
          <Figure
            ImageProps={{
              src: image.url,
              alt: image.filename || image.alt,
            }}
            sx={() => {
              return {
                border: 2,
                borderColor: "#FEFAED",
                height: image.height,
                maxWidth: "100%",
              };
            }}
          />
        </Box>
      </Grid>
      <Grid xs={12} item>
        <RichTypography
          color="#3E202C"
          sx={{ fontWeight: { xs: 400 } }}
          typography={{ md: "h2", xs: "h3" }}
          variant="h2SemiBold"
        >
          {title}
        </RichTypography>
      </Grid>
      <Grid xs={12} item>
        <RichText
          color="#3E202C"
          elements={description}
          typography={{ md: "subheading" }}
          variant="p2"
        />
      </Grid>
    </Grid>
  );
}

Explainer.propTypes = {
  image: PropTypes.shape({}),
  description: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
};
Explainer.defaultProps = {
  image: {},
  description: [],
  title: "",
};
export default Explainer;
