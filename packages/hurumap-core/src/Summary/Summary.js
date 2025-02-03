import { Section } from "@commons-ui/core";
import { RichText } from "@commons-ui/payload";
import { Box, Grid, Typography, alpha } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const Summary = React.forwardRef(function Summary(props, ref) {
  const { content, title, subtitle } = props;

  if (!content) {
    return null;
  }
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        py: { xs: 5, md: 10 },
      }}
      ref={ref}
    >
      <Section>
        <Grid justifyContent="space-between" container>
          <Grid item xs={12} lg={4}>
            <Typography
              variant="h2"
              sx={{
                mb: 5,
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 5,
              }}
            >
              {subtitle}
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <RichText
              elements={content}
              MediaProps={{
                ImageProps: {
                  sx: (theme) => ({
                    border: `1px solid ${theme.palette.divider}`,
                    borderRadius: 1,
                  }),
                },
                CaptionProps: {
                  sx: (theme) => ({
                    color: alpha(theme.palette.text.primary, 0.75),
                  }),
                },
              }}
              TypographyProps={{
                LinkProps: {
                  color: "text.primary",
                  // TODO(kilemensi): Figure out why textDecorationColor doesn't change
                },
                variant: "body2",
              }}
              sx={{
                "&>p": {
                  mb: 4,
                },
                "&>p:last-of-type": {
                  mb: 0,
                },
              }}
            />
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
});

Summary.propTypes = {
  content: PropTypes.arrayOf(PropTypes.shape({})),
  subtitle: PropTypes.string,
  title: PropTypes.string,
};

export default Summary;
