import { RichTypography, Section } from "@commons-ui/core";
import { Box } from "@mui/material";
import React, { forwardRef } from "react";

import { neutral } from "@/charterafrica/colors";
import EmbedYoutubeVideo from "@/charterafrica/components/EmbedYoutubeVideo";

const Consultations = forwardRef((props, ref) => {
  const { consultations, config } = props;
  if (!consultations?.length) {
    return null;
  }

  return (
    <Box bgcolor={neutral[50]} ref={ref}>
      <Section>
        <Box>
          {consultations.map((consultation) => {
            const { description, id } = consultation;
            return (
              <Box sx={{ pt: 6.25 }} key={id}>
                <EmbedYoutubeVideo
                  videoId={consultation?.resourceId?.videoId}
                  config={config}
                />
                <RichTypography variant="p3" sx={{ mt: 3.75 }}>
                  {description}
                </RichTypography>
              </Box>
            );
          })}
        </Box>
      </Section>
    </Box>
  );
});

export default Consultations;
