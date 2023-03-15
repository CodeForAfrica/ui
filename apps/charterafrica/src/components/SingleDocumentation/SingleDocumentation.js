import { Section, RichTypography } from "@commons-ui/core";
import { Box } from "@mui/material";
import React from "react";

import { secondary, neutral } from "@/charterafrica/colors";

const SingleDocumentation = React.forwardRef(function SingleDocumentation(
  props,
  ref
) {
  const { embedHTML, excerpt, title, sx } = props;

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
          variant="h2SemiBold"
          color="neutral.dark"
          sx={{
            textAlign: "center",
            py: 1,
          }}
        >
          {title}
        </RichTypography>
        <RichTypography
          variant="subheading"
          sx={{
            textAlign: "center",
            pb: 5,
          }}
        >
          {excerpt}
        </RichTypography>
        <Box
          sx={{
            width: {
              md: "849px",
              sm: "568px",
              xs: "300px",
            },
            backgroundColor: "white",
            border: "1px solid",
            borderColor: neutral[800],
            margin: "0 auto",
          }}
        >
          <div dangerouslySetInnerHTML={{ __html: embedHTML }} />
        </Box>
      </Section>
    </Box>
  );
});

export default SingleDocumentation;
