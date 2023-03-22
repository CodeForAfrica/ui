import { Section, RichTypography } from "@commons-ui/core";
import { Box } from "@mui/material";
import React from "react";

import useDocument from "./useDocument";

import { secondary, neutral } from "@/charterafrica/colors";
import RichText from "@/charterafrica/components/RichText";

const EmbeddedDocumentViewer = React.forwardRef(function EmbeddedDocumentViewer(
  props,
  ref
) {
  const { excerpt, options, sx, title } = props;
  const {
    url,
    showNotes = false,
    search = false,
    text = false,
    zoom = false,
  } = options || {};

  const { data } = useDocument(url, {
    notes: showNotes,
    search,
    text,
    zoom,
  });
  const { html } = data || {};
  if (!html?.length) {
    return null;
  }
  return (
    <Box
      sx={{
        backgroundColor: secondary[50],
        pb: 5,
        ...sx,
      }}
      ref={ref}
    >
      <Section
        sx={{
          px: { xs: 7.5, sm: 0 },
        }}
      >
        <RichTypography
          color="neutral.dark"
          variant="h2"
          sx={{
            textAlign: "center",
            py: 1,
          }}
        >
          {title}
        </RichTypography>
        <RichText
          elements={excerpt}
          variant="subheading"
          sx={{
            textAlign: "center",
            pb: 5,
          }}
        />
        <Box
          backgroundColor="white"
          border="1px solid"
          borderColor={neutral[800]}
          margin="0 auto"
          width={{
            md: "849px",
            sm: "568px",
            xs: "300px",
          }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Section>
    </Box>
  );
});

export default EmbeddedDocumentViewer;
