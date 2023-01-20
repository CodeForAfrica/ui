import { Section } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React from "react";

import { neutral } from "@/charterafrica/colors";
import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";

const Mooc = React.forwardRef(function Mooc(props, ref) {
  const { title, link, image, sx } = props;

  if (!title || !link || !image) {
    return null;
  }

  return (
    <Box bgcolor={neutral[900]} ref={ref} sx={sx}>
      <Section
        ref={ref}
        sx={{ px: { xs: 5, sm: 0 }, py: { xs: 5, md: "86px" } }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column-reverse", sm: "row" }}
          gap={5}
          justifyContent="center"
          alignItems="center"
        >
          <Box
            flex={1.2}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems={{ xs: "center", md: "flex-start" }}
            sx={{ gap: 5 }}
          >
            <LineClampedRichTypography
              component="h1"
              textAlign="left"
              typography={{ md: "h1", sm: "h2" }}
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
            flexDirection="column"
          >
            <Box
              height={{
                xs: "329px",
              }}
            >
              <Figure
                ImageProps={{
                  ...image,
                  alt: title.content,
                  objectFit: "cover",
                }}
                sx={{
                  height: {
                    xs: 329,
                  },
                  width: {
                    xs: "90vw",
                    sm: "35vw",
                    md: "25vw",
                    lg: 512,
                  },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Section>
    </Box>
  );
});

export default Mooc;
