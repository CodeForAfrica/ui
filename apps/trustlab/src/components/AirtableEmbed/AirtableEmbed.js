import { Box, Skeleton } from "@mui/material";
import React, { useMemo, useState } from "react";

import getEmbedSrc from "./getEmbedSrc";

function AirtableEmbed({ embedCode, load = true, title, sx }) {
  const src = useMemo(() => getEmbedSrc(embedCode), [embedCode]);
  const [loaded, setLoaded] = useState(false);

  if (!src) {
    return null;
  }
  return (
    <Box
      sx={[
        { position: "relative", width: "100%" },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {!loaded && (
        <Skeleton
          variant="rectangular"
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
          }}
        />
      )}
      {load && (
        <Box
          component="iframe"
          src={src}
          title={title || "Airtable form"}
          onLoad={() => setLoaded(true)}
          sx={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            border: 0,
            display: "block",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.2s ease-in",
          }}
        />
      )}
    </Box>
  );
}

export default AirtableEmbed;
