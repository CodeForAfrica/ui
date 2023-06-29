import { Section } from "@commons-ui/core";
import { Box } from "@mui/material";
import React from "react";

const FlourishCharts = React.forwardRef(function FlourishCharts(props, ref) {
  const { backgroundColor, height, html, width } = props;

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
          py: { xs: 5, md: 7.5 },
          width: `${width}%`,
          height: `${height + 50}px`,
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </Section>
    </Box>
  );
});

export default FlourishCharts;
