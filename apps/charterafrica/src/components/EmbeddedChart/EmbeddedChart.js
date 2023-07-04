import { Section } from "@commons-ui/core";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import React, { useState, useEffect } from "react";

const EmbeddedChart = React.forwardRef(function EmbeddedChart(props, ref) {
  const {
    backgroundColor,
    height: originalHeight,
    html: originalHtml,
    title,
    subtitle,
    width,
  } = props;

  const theme = useTheme();
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const newHeight = isSmDown ? "350px" : "400px";

  const [height, setHeight] = useState(originalHeight);
  const [html, setHtml] = useState(originalHtml);

  useEffect(() => {
    const dataHeightRegex = /data-height="(\d+)px"/g;
    setHeight(newHeight);
    const newHTML = originalHtml.replace(
      dataHeightRegex,
      `data-height="${newHeight}"`
    );
    setHtml(newHTML);
  }, [isSmDown, newHeight, originalHtml]);

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
            width: `${width}`,
            height: `${height}`,
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Section>
    </Box>
  );
});

export default EmbeddedChart;
