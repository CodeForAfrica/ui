import { Section } from "@commons-ui/core";
import { Box } from "@mui/material";
import React from "react";

import { secondary } from "@/charterafrica/colors";
import LongFormRichText from "@/charterafrica/components/LongFormRichText";

const COMPONENT_BY_LONG_FORM_TYPE = {
  richText: LongFormRichText,
};

const LongForm = React.forwardRef(function LongForm(props, ref) {
  const { content, sx } = props;

  if (!content?.length) {
    return null;
  }
  return (
    <Box
      sx={{
        backgroundColor: secondary[50],
        ...sx,
      }}
      ref={ref}
    >
      <Section
        sx={{
          color: "neutral.dark",
          px: { xs: 5, sm: 0 },
          py: { xs: 5, md: "74.5px" },
        }}
      >
        {content.map((c) => {
          const Component = COMPONENT_BY_LONG_FORM_TYPE[c.slug];
          if (Component) {
            return <Component {...c} key={c.id} />;
          }
          return null;
        })}
      </Section>
    </Box>
  );
});

export default LongForm;
