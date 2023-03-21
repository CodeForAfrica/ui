import { RichTypography, Section } from "@commons-ui/core";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";

import { neutral } from "@/charterafrica/colors";
import EmbedYoutubeVideo from "@/charterafrica/components/EmbedYoutubeVideo";
import YoutubeVideoPlayer from "@/charterafrica/components/YoutubeVideoPlayer";

const Consultations = forwardRef((props, ref) => {
  const { airedOn, items, config, isFeatured, sx, title, consultationTitle } =
    props;
  if (!items?.length) {
    return null;
  }

  return (
    <Box bgcolor={isFeatured ? neutral[50] : "common.white"} sx={sx} ref={ref}>
      <Section>
        <RichTypography variant="h2" color="neutral.dark" textAlign="center">
          {title}
        </RichTypography>
        <RichTypography
          color="neutral.dark"
          fontWeight={{ xs: 400, md: 400 }}
          variant="h3"
        >
          {consultationTitle}
        </RichTypography>
        <RichTypography variant="p3">{airedOn}</RichTypography>
        {items.map((consultation) => {
          const { description, id } = consultation;
          return (
            <Box sx={{ py: 6.25 }} key={id}>
              {isFeatured ? (
                <EmbedYoutubeVideo
                  videoId={consultation?.resourceId?.videoId}
                  config={config}
                  key={id}
                />
              ) : (
                <YoutubeVideoPlayer
                  videoId={consultation?.resourceId?.videoId}
                />
              )}
              <RichTypography variant="p3" sx={{ mt: 3.75 }}>
                {description}
              </RichTypography>
            </Box>
          );
        })}
      </Section>
    </Box>
  );
});

Consultations.propTypes = {
  isFeatured: PropTypes.bool,
  config: PropTypes.shape({}),
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

Consultations.defaultProps = {
  isFeatured: undefined,
  config: undefined,
  items: undefined,
};

export default Consultations;
