"use client";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useMemo } from "react";

import cfaLogoDark from "@/engineeringblog/assets/images/logo-dark-mode.png";
import cfaLogoLight from "@/engineeringblog/assets/images/logo-light-mode.png";

export default function Navbar() {
  const theme = useTheme();
  const logo = useMemo(() => {
    // Cannot dymaically import the image according to the docs that's why we must import both
    // regardless of the theme palette mode. Leaving this here as a potential optimization in the future.
    //
    // https://nextjs.org/docs/app/building-your-application/optimizing/images#local-images
    // > Warning: Dynamic await import() or require() are not supported. The import must be static so it can be analyzed at build time.

    return theme.palette.mode === "light" ? cfaLogoLight : cfaLogoDark;
  }, [theme.palette.mode]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="transparent">
        <Toolbar sx={{ justifyContent: "center" }}>
          <Box sx={{ mr: 2, py: 2 }}>
            <Image src={logo} alt="CFA Logo" height={60} />
          </Box>
          <Typography variant="h6" component="div">
            ENGINEERING
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
