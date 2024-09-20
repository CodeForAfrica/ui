"use client";

import { Section } from "@commons-ui/core";
import React from "react";
import { alpha, Box, Typography } from "@mui/material";

import bg from "@/techlabblog/assets/images/1920x668px bg - 2 2.png";

const NoPosts = React.forwardRef(function NoPosts() {
  return (
    <Box
      sx={(theme) => ({
        py: { xs: 7.5, md: 10, lg: 12.5 },
        display: "flex",
        justifyContent: "center",
        width: "100%",
        position: "relative",
        backgroundColor: "palette.background.main",
        backgroundImage: `url('${bg.src}')`,
        backgroundPosition: "top left",
        "&:before": {
          content: '""',
          top: 0,
          left: 0,
          position: "absolute",
          height: "100%",
          width: "100%",
          background: `linear-gradient(to right, 'palette.background.main', transparent 30%)`,
          [theme.breakpoints.up("sm")]: {
            background: `linear-gradient(to right, 'palette.background.main' 20%, transparent 30%)`,
          },
          [theme.breakpoints.up("md")]: {
            background: `linear-gradient(to right, ${theme.palette.background.default
              } 30%, transparent 40%, transparent 95%, ${alpha(
                theme.palette.background.default,
                0.7,
              )} 98%)`,
          },
          [theme.breakpoints.up("lg")]: {
            background: `linear-gradient(to right, ${theme.palette.background.default} 30%, transparent 40%, transparent 95%, ${theme.palette.background.default} 99%)`,
          },
          [theme.breakpoints.up("xl")]: {
            background: `linear-gradient(to right, ${theme.palette.background.default} 35%, transparent 45%, transparent 80%, ${theme.palette.background.default} 90%)`,
          },
        },
      })}
    >
      <Section
        sx={{
          maxWidth: {
            sm: "648px",
            md: "912px",
          },
          px: { xs: 2.5, sm: 0 },
          zIndex: 1,
        }}
      >
        <Typography
          sx={{
            paddingBottom: 2.5,
          }}
          variant="h1"
        >
          Whoops! No articles found.
        </Typography>
        <Typography variant="body2">
          We are working on creating more content for you. Stay tuned!
        </Typography>
      </Section>
    </Box>
  );
});

export default NoPosts;
