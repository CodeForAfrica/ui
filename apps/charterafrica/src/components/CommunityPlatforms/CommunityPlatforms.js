import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import CommunityPlatform from "./CommunityPlatform";

const CommunityPlatforms = React.forwardRef(function CommunityPlatforms(
  props,
  ref
) {
  const { items, sx } = props;

  if (!items?.length) {
    return null;
  }
  return (
    <Box bgcolor="common.white" sx={sx} ref={ref}>
      <Grid container>
        {items.map((platform) => (
          <Grid key={platform.name} item xs={12} sm={12 / items.length}>
            <CommunityPlatform {...platform} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
});

CommunityPlatforms.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.node,
};

CommunityPlatforms.defaultProps = {
  items: undefined,
  title: undefined,
};

export default CommunityPlatforms;
