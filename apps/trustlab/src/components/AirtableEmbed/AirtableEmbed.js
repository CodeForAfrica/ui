import { Box, Skeleton } from "@mui/material";
import React, { useMemo, useState } from "react";

const HTML_ENTITIES = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
};

// Attribute values in pasted embed code are HTML-escaped (e.g. `&` appears
// as `&amp;` between query params); the browser would decode them when
// parsing HTML, so we must too before reusing the URL as an iframe src.
function decodeHtmlEntities(value) {
  return value.replace(/&(?:amp|lt|gt|quot|#39);/g, (entity) => {
    return HTML_ENTITIES[entity];
  });
}

function extractIframeSrc(embedCode) {
  const match = embedCode?.match(/<iframe[^>]*\ssrc=["']([^"']+)["']/i);
  return match?.[1] ? decodeHtmlEntities(match[1]) : null;
}

function AirtableEmbed({ embedCode, load = true, title, sx }) {
  const src = useMemo(() => extractIframeSrc(embedCode), [embedCode]);
  const [loaded, setLoaded] = useState(false);

  if (!embedCode?.trim()) {
    return null;
  }
  if (!src) {
    // Embed code without a parseable iframe src; inject as-is
    if (!load) {
      return null;
    }
    return (
      <Box
        sx={[
          {
            width: "100%",
            "& iframe": {
              width: "100%",
              height: "100%",
              border: 0,
            },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        dangerouslySetInnerHTML={{ __html: embedCode }}
      />
    );
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
