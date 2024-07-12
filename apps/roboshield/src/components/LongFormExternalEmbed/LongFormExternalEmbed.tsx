import { RichTypography } from "@commons-ui/core";
import { Box } from "@mui/material";
import React from "react";
import { ExternalEmbedBlock } from "@/roboshield/components/Content/Content";

export default function LongFormExternalEmbed(props: ExternalEmbedBlock) {
  const { externalEmbedFields: { code = "", caption = "", url = "" } = {} } =
    props;

  return (
    <Box
      sx={{
        my: 5,
      }}
    >
      {code && <RichTypography>{code}</RichTypography>}
      {url && (
        <iframe
          src={url}
          title={caption!}
          style={{
            width: "100%",
            height: "500px",
            border: "none",
          }}
        />
      )}
    </Box>
  );
}
