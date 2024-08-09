import { RichTypography } from "@commons-ui/core";
import { Box } from "@mui/material";
import React from "react";

const LongFormExternalEmbed = React.forwardRef((props, ref) => {
  const { embedBlockFields: { code = "", caption = "", url = "" } = {} } =
    props;

  return (
    <Box
      sx={{
        my: 5,
      }}
      ref={ref}
    >
      {code && <RichTypography>{code}</RichTypography>}
      {url && (
        <iframe
          src={url}
          title={caption}
          style={{
            width: "100%",
            height: "500px",
            border: "none",
          }}
        />
      )}
    </Box>
  );
});

export default LongFormExternalEmbed;
