import { Section } from "@commons-ui/core";
import { Box, Typography } from "@mui/material";
import React from "react";

const EmbeddedChart = React.forwardRef(function EmbeddedChart(props, ref) {
  const { backgroundColor, height, html, title, subtitle, width } = props;

  return (
    <Box
      sx={{
        backgroundColor: { backgroundColor },
      }}
      ref={ref}
    >
      <Section
        sx={{
          px: { xs: 5, sm: 0 },
          pt: 2.5,
          pb: 0,
        }}
      >
        <Typography variant="h5SemiBold" sx={{ mb: 1 }} color="neutral.dark">
          {title}
        </Typography>
        <Typography variant="p1" sx={{ mb: 1 }} color="neutral.dark">
          {subtitle}
        </Typography>
        <div
          style={{
            width: `${width}%`,
            height: `${height}px`,
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Section>
    </Box>
  );
});

export default EmbeddedChart;
