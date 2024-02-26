/* eslint-env browser */
import { RichTypography, Section } from "@commons-ui/core";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

const FlourishChart = React.forwardRef(function FlourishChart(props, ref) {
  const { backgroundColor, chartId, subtitle, title } = props;
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const handleMessageEvent = (event) => {
      const { sender, context, ...message } = JSON.parse(event.data) || {};
      if (sender === "Flourish" && context === "iframe.resize") {
        setHeight(Math.ceil(message.height));
      }
    };
    window.addEventListener("message", handleMessageEvent);
    return () => {
      document.removeEventListener("message", handleMessageEvent);
    };
  });

  if (!chartId?.length) {
    return null;
  }
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
        <RichTypography color="neutral.dark" variant="p1" sx={{ my: 1 }}>
          {subtitle}
        </RichTypography>
        <iframe
          key={chartId}
          title={title || "Flourish Chart "}
          src={`https://flo.uri.sh/${chartId}/embed?auto=1`}
          scrolling="no"
          style={{
            border: 0,
            height,
            width: "100%",
          }}
        />
      </Section>
    </Box>
  );
});

export default FlourishChart;
