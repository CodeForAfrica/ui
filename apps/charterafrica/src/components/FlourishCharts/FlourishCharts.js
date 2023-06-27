import { Section } from "@commons-ui/core";
import { Box } from "@mui/material";
import React from "react";

const FlourishCharts = React.forwardRef(function FlourishCharts(props, ref) {
  const { code } = props;

  return (
    <Box
      sx={{
        backgroundColor: "#fff",
      }}
      ref={ref}
    >
      <Section
        sx={{
          px: { xs: 5, sm: 0 },
          py: { xs: 5, md: 7.5 },
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: code }} />
      </Section>
    </Box>
  );
});

export default FlourishCharts;
