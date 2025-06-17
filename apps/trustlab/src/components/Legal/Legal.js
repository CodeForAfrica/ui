import { Section } from "@commons-ui/core";
import { LexicalRichText } from "@commons-ui/payload";
import React, { forwardRef } from "react";

const Legal = forwardRef((props, ref) => {
  const { content } = props;
  if (!content) {
    return null;
  }
  return (
    <Section sx={{ m: "0 auto", py: 8, px: { xs: 2.5 } }} {...props} ref={ref}>
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
        }}
        TypographyProps={{
          gutterBottom: true,
          sx: {
            mb: 3,
          },
        }}
      />
    </Section>
  );
});

export default Legal;
