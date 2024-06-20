import { RichTypography } from "@commons-ui/core";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import ShareThisPage from "@/charterafrica/components/ShareThisPage";

const DescriptionAndShare = React.forwardRef(
  function DescriptionAndShare(props, ref) {
    const { sx, description, lastActive, activeText } = props;
    return (
      <Box sx={sx} ref={ref}>
        <RichTypography
          textAlign="left"
          color="neutral.dark"
          sx={{ mt: 3.75 }}
          variant="p1"
        >
          {description}
        </RichTypography>
        {lastActive ? (
          <RichTypography
            textAlign="left"
            color="neutral.dark"
            sx={{
              mt: 3.75,
              textTransform: "none",
              textAlign: { xs: "center", sm: "left" },
            }}
            variant="captionCap"
          >
            {activeText} {lastActive}
          </RichTypography>
        ) : null}
        <Box
          display="flex"
          sx={{
            mt: 3.75,
            width: "100%",
            justifyContent: { sm: "flex-end", xs: "center" },
          }}
        >
          <ShareThisPage
            sx={{ textAlign: { sm: "right", xs: "center" } }}
            title="Share via"
          />
        </Box>
      </Box>
    );
  },
);

DescriptionAndShare.propTypes = {
  sx: PropTypes.shape({}),
  description: PropTypes.string,
  lastActive: PropTypes.string,
};

DescriptionAndShare.defaultProps = {
  sx: undefined,
  lastActive: undefined,
  description: undefined,
};

export default DescriptionAndShare;
