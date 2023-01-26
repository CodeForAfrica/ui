import RichTypography from "@/commons-ui/core/RichTypography";
import { Figure } from "@commons-ui/next";
import { Grid, Divider } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

function Explainer({ image, description, title }) {
  return (
    <>
      <Grid display="flex" justifyContent="center" container>
        <Grid container spacing={4}>
          <Grid xs={12} item>
            <Figure
              ImageProps={{
                ...image,
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
                  width: {
                    xs: theme.contentWidths.values.sm / 2.5,
                    sm: theme.contentWidths.values.sm,
                    md: theme.contentWidths.values.md,
                    lg: theme.contentWidths.values.lg,
                    xl: theme.contentWidths.values.xl,
                  },
                };
              }}
            />
          </Grid>
          <Grid xs={12} item>
            <RichTypography
              color="#3E202C"
              variant="h2"
              sx={{ fontWeight: 400 }}
            >
              {title}
            </RichTypography>
          </Grid>
          <Grid xs={12} item>
            <RichTypography color="#3E202C" variant="p3">
              {description}
            </RichTypography>
          </Grid>
        </Grid>
      </Grid>
      <Divider sx={{ margin: 8 }} />
    </>
  );
}

Explainer.propTypes = {
  image: PropTypes.shape({}),
  description: PropTypes.string,
  title: PropTypes.string,
};
Explainer.defaultProps = {
  image: {},
  description: "d",
  title: "",
};
export default Explainer;
