import { RichTypography, Section } from "@commons-ui/core";
import { Box } from "@mui/material";
import React from "react";

const EmbeddedChart = React.forwardRef(function EmbeddedChart(props, ref) {
  const { backgroundColor, html, subtitle, title, width } = props;

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
          py: 2.5,
        }}
      >
        <RichTypography html={false} variant="h5SemiBold" color="neutral.dark">
          {title}
        </RichTypography>
        <RichTypography
          color="neutral.dark"
          html={false}
          variant="p1"
          sx={{ my: 1 }}
        >
          {subtitle}
        </RichTypography>
        <RichTypography sx={{ margin: "0 auto", width }}>{html}</RichTypography>
      </Section>
    </Box>
  );
});

export default EmbeddedChart;
