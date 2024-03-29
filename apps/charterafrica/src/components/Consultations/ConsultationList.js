import { RichTypography, Section } from "@commons-ui/core";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";

import { neutral } from "@/charterafrica/colors";
import EmbeddedYouTubeVideo from "@/charterafrica/components/EmbeddedYouTubeVideo";
import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";
import YoutubeVideoPlayer from "@/charterafrica/components/YoutubeVideoPlayer";
import formatDateTime from "@/charterafrica/utils/formatDate";

const ConsultationList = forwardRef(function ConsultationList(props, ref) {
  const { items, config, isFeatured, sx, title } = props;

  if (!items?.length) {
    return null;
  }
  return (
    <Box bgcolor={isFeatured ? neutral[50] : "common.white"} sx={sx} ref={ref}>
      <Section
        sx={{
          maxWidth: { md: "640px", lg: "1080px", xl: "1080px" },
          px: { xs: 5, sm: 0 },
          py: { xs: 6.25, md: 12.5 },
        }}
      >
        <LineClampedRichTypography
          color="neutral.dark"
          textAlign="center"
          variant="h2"
          sx={{ mb: 6.25 }}
        >
          {title}
        </LineClampedRichTypography>
        {items.map((consultation) => {
          const { description, id } = consultation;
          return (
            <Box
              sx={{
                pb: 6.25,
                "&:last-of-type": {
                  pb: 0,
                },
              }}
              key={id}
            >
              <LineClampedRichTypography
                color="neutral.dark"
                fontWeight={{ xs: 400, md: 400 }}
                variant="h3SemiBold"
                sx={{ mb: 1.25 }}
              >
                {consultation.title}
              </LineClampedRichTypography>
              <LineClampedRichTypography
                lineClamp={1}
                sx={{ mb: 4 }}
                variant="p3"
              >
                {config.airedOnText}{" "}
                {formatDateTime(
                  consultation?.publishedAt || consultation.createdAt,
                  {},
                )}
              </LineClampedRichTypography>
              {isFeatured ? (
                <EmbeddedYouTubeVideo
                  videoId={consultation?.videoId}
                  config={config}
                  key={id}
                />
              ) : (
                <YoutubeVideoPlayer videoId={consultation?.videoId} />
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

ConsultationList.propTypes = {
  isFeatured: PropTypes.bool,
  config: PropTypes.shape({}),
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

ConsultationList.defaultProps = {
  isFeatured: undefined,
  config: undefined,
  items: undefined,
};

export default ConsultationList;
