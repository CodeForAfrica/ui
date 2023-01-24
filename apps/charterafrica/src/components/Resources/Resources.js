import { RichTypography } from "@commons-ui/core";
import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import Resource from "./Resource";

const Resources = React.forwardRef(function Resources(props, ref) {
  const { resources, title, sx } = props;

  if (!resources?.length) {
    return null;
  }
  return (
    <Box sx={sx} ref={ref}>
      <RichTypography
        color="neutral.dark"
        html={false}
        textAlign="center"
        variant="h1Small"
        sx={{ py: 5, typography: { md: "h1" } }}
      >
        {title}
      </RichTypography>
      <Grid container>
        {resources.map((resource) => (
          <Grid key={resource.name} item xs={12} sm={6}>
            <Resource {...resource} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});

Resources.propTypes = {
  resources: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.node,
};

Resources.defaultProps = {
  resources: undefined,
  title: undefined,
};

export default Resources;
