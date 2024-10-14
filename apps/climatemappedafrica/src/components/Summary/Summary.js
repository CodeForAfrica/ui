import { RichText } from "@commons-ui/payload";
import { Box, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import Section from "@/climatemappedafrica/components/Section";

const Summary = React.forwardRef(function Summary(props, ref) {
  const { content, title, subtitle } = props;
  const classes = useStyles(props);

  if (!content) {
    return null;
  }
  return (
    <Box
      className={classes.root}
      sx={{
        bgcolor: "background.paper",
      }}
      ref={ref}
    >
      <Section classes={{ root: classes.section }}>
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
              typographyProps={{
                variant: "body2",
                LinkProps: {
                  color: "text.primary",
                  sx: {
                    textDecorationColor: "text.primary",
                    textDecoration: "underline",
                  },
                },
              }}
              sx={{
                "&>p": {
                  mb: 4,
                },
                "&>p:last-of-type": {
                  mb: 0,
                },
              }}
            >
              {content}
            </RichText>
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
