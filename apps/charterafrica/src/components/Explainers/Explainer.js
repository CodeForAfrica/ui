import RichTypography from "@/commons-ui/core/RichTypography";
import { Figure } from "@commons-ui/next";
import { Grid, Divider } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import RichText from "../RichText";

function Explainer({ image, description, title }) {
  return (
    <>
      <Grid display="flex" justifyContent="center" sx={{ p: 8 }} container>
        <Grid container spacing={4}>
          <Grid xs={12} item>
            <Figure
              ImageProps={{
                // ...image,
                src: image.url,
                alt: image.filename || image.alt,
              }}
              sx={(theme) => {
                return {
                  border: 2,
                  borderColor: "#FEFAED",
                  height: {
                    xl: theme.contentWidths.values.xl / 1.8,
                    sm: theme.contentWidths.values.sm / 1.8,
                    xs: theme.contentWidths.values.sm / 4,
                    md: theme.contentWidths.values.md / 1.8,
                    lg: theme.contentWidths.values.lg / 1.8,
                  },

                  maxWidth: "100%",
                };
              }}
            />
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
            <RichText color="#3E202C" variant="p3" elements={description}>
              {description}
            </RichText>
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ p: 2, ml: 8 }} />
    </>
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
