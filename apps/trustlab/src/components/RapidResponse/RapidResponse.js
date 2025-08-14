import { Section } from "@commons-ui/core";
import { Figure, Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import {
  Grid2 as Grid,
  Typography,
  Stack,
  Divider,
  Box,
  SvgIcon,
} from "@mui/material";
import React, { forwardRef } from "react";

import ArrowUpRightIcon from "@/trustlab/assets/icons/Type=arrowUpRight, Size=20, Color=CurrentColor.svg";

const RapidResponse = forwardRef(function RapidResponse(
  { title, briefs = [] },
  ref,
) {
  return (
    <Box bgcolor="common.white">
      <Section
        ref={ref}
        sx={{ background: "common.white", py: 4, px: { xs: 2.5, md: 0 } }}
      >
        <Stack spacing={4}>
          <Typography variant="h1">{title}</Typography>
          <Grid container sx={{ ml: -2 }} spacing={2}>
            {briefs.map((brief) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={brief.title}>
                <Stack
                  component={brief?.link?.href ? Link : "div"}
                  href={brief?.link?.href}
                  alignItems={{
                    xs: "flex-start",
                    sm: "center",
                    textDecoration: "none",
                  }}
                  gap={2}
                >
                  <Figure
                    ImageProps={{
                      alt: brief.icon.alt,
                      src: brief.icon.url,
                    }}
                    sx={{
                      height: { xs: "108px", md: "180px" },
                      width: { xs: "108px", md: "180px" },
                    }}
                  />
                  <Box sx={{ width: "100%" }}>
                    <Divider
                      sx={{
                        background: "black",
                        mb: 2,
                        display: { xs: "none", sm: "block" },
                      }}
                    />
                    <Typography
                      variant="h3"
                      sx={{
                        textDecoration: "none",
                        "&:after": {
                          content: '""',
                          display: { sm: "none", xs: "block" },
                          width: "18px",
                          height: "1px",
                          backgroundColor: "black",
                          marginTop: "8px",
                        },
                      }}
                    >
                      {brief.title}
                    </Typography>
                    <Divider
                      sx={{
                        background: "black",
                        mt: 2,
                        display: { xs: "none", sm: "block" },
                      }}
                    />
                  </Box>

                  <LexicalRichText
                    elements={brief.description}
                    TypographyProps={{
                      gutterBottom: true,
                      variant: "p2",
                      sx: {
                        mb: 0,
                        textDecoration: "none",
                      },
                    }}
                  />
                  {brief.link?.label && (
                    <Box
                      display={{ xs: "flex", sm: "none" }}
                      alignItems="center"
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          cursor: "pointer",
                          alignSelf: "flex-start",
                          textDecoration: "none",
                          color: "#1020E1",
                          fontWeight: "bold",
                        }}
                      >
                        {brief.link.label}
                      </Typography>
                      <SvgIcon
                        sx={{
                          color: "#1020E1",
                        }}
                        component={ArrowUpRightIcon}
                      />
                    </Box>
                  )}
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Stack>
      </Section>
    </Box>
  );
});

export default RapidResponse;
