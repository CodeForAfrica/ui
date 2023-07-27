import { Box, Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import CommunityPlatform from "./CommunityPlatform";

const CommunityPlatforms = React.forwardRef(
  function CommunityPlatforms(props, ref) {
    const { items, sx } = props;

    if (!items?.length) {
      return null;
    }
    const count = items.length;
    // Design supports a maximum of 3 cards per row in sm and above
    const mdItemsPerRow = Math.min(count, 3);
    // Grid columns per item
    const md = Math.floor(12 / mdItemsPerRow);
    return (
      <Box bgcolor="common.white" sx={sx} ref={ref}>
        <Grid container>
          {items.map((platform) => (
            <Grid key={platform.name} item xs={12} md={md}>
              <CommunityPlatform {...platform} />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  },
);

CommunityPlatforms.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.node,
};

CommunityPlatforms.defaultProps = {
  items: undefined,
  title: undefined,
};

export default CommunityPlatforms;
