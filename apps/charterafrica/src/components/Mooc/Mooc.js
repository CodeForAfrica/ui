import Figure from "@/commons-ui/next/Figure";
import { Section } from "@commons-ui/core";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";

import { neutral } from "@/charterafrica/colors";
import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";

const Mooc = React.forwardRef(function Mooc(props, ref) {
  const { title, image, link, sx } = props;

  if (!title || !image || !link) {
    return null;
  }

  return (
    <Box bgcolor={neutral[900]} ref={ref} sx={sx}>
      <Section>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box
            flex={1.2}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="start"
            sx={{ gap: 5 }}
          >
            <LineClampedRichTypography
              component="h1"
              textAlign="start"
              typography={{ md: "h1" }}
              variant="h4"
              sx={() => ({
                color: title?.color,
                "&>i": {
                  color: "secondary.main",
                  fontStyle: "normal",
                },
              })}
            >
              {title?.content || title}
            </LineClampedRichTypography>
            <Button
              color="secondary"
              size="medium"
              variant="contained"
              sx={{ width: "fit-content" }}
            >
              {link?.content}
            </Button>
          </Box>
          <Box
            flex={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Figure
              sx={{ height: 512, width: 329 }}
              ImageProps={{ alt: title, ...image }}
            />
          </Box>
        </Box>
      </Section>
    </Box>
  );
});

export default Mooc;
