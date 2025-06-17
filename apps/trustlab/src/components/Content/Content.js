import { Section } from "@commons-ui/core";
import { LexicalRichText } from "@commons-ui/payload";
import { Box } from "@mui/material";
import React, { forwardRef } from "react";

const Content = forwardRef((props, ref) => {
  const {
    content,
    backgroundColor = "common.white",
    textColor = "text.primary",
  } = props;
  if (!content) {
    return null;
  }
  return (
    <Box
      sx={{
        py: 8,
        px: { xs: 2.5 },
        backgroundColor,
      }}
      ref={ref}
      bgcolor="common.white"
      {...props}
    >
      <Section sx={{ m: "0 auto" }}>
        <LexicalRichText
          elements={content}
          sx={{
            h1: {
              borderBottom: `1px solid`,
              mb: 3,
              pb: 1,
            },
            p: {
              mb: 3,
            },
            color: textColor,
          }}
          TypographyProps={{
            gutterBottom: true,
            sx: {
              mb: 3,
              color: textColor,
            },
          }}
        />
      </Section>
    </Box>
  );
});

export default Content;
