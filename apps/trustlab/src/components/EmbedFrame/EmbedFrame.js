import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

function EmbedFrame({
  embed,
  open,
  shouldLoad,
  title,
  iframeSx,
  minHeight = 400,
}) {
  const [loaded, setLoaded] = React.useState(false);

  if (!embed) {
    return null;
  }

  return (
    <Box
      aria-busy={open && shouldLoad && !loaded ? true : undefined}
      sx={{
        position: "relative",
        width: "100%",
        minHeight,
      }}
    >
      {shouldLoad ? (
        <Box
          component="iframe"
          allow={embed.allow}
          allowFullScreen={embed.allowFullScreen || undefined}
          loading="eager"
          onLoad={() => setLoaded(true)}
          referrerPolicy={embed.referrerPolicy}
          src={embed.src}
          title={embed.title || title}
          sx={{
            width: "100%",
            minHeight,
            border: "none",
            backgroundColor: "common.white",
            ...iframeSx,
          }}
        />
      ) : null}
      {open && (!shouldLoad || !loaded) ? (
        <Box
          sx={{
            position: shouldLoad ? "absolute" : "static",
            inset: shouldLoad ? 0 : "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 1.5,
            minHeight,
            px: 3,
            textAlign: "center",
            backgroundColor: shouldLoad
              ? "rgba(255, 255, 255, 0.92)"
              : "transparent",
          }}
        >
          <CircularProgress color="inherit" size={24} />
          <Typography variant="body2">Loading form...</Typography>
        </Box>
      ) : null}
    </Box>
  );
}

export default EmbedFrame;
