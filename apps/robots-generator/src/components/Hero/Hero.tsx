import { CenterFocusStrong } from "@mui/icons-material";
import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button";
import React from "react";
import Typography from "@mui/material/Typography";
import Image from "next/image";

const Hero = () => {
  return (
    <Box
      component="section"
      sx={{
        textAlign: "center",
        height: "600px",
        backgroundColor: "#0C1A81",
        backgroundImage: "url(./bg-shape-8.svg)",
        backgroundSize: "cover",
        paddingTop: "170px",
      }}
    >
      <Box
        sx={{
          margin: "auto",
        }}
      >
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            py: "8px",
            color: "#FFFFFF",
          }}
        >
          HOW IT WORKS
        </Typography>
      </Box>

      <Box
        sx={{
          zIndex: "50",
          height: 300,
        }}
      >
        <Typography
          variant="h1"
          gutterBottom
          sx={{
            py: "8px",
            color: "#FFFFFF",
          }}
        >
          Protect your{" "}
          <Box
            component="div"
            sx={{
              display: "inline-block",
              color: "#FFFFF",
              backgroundColor: "red",
              margin: "0 8px",
              padding: "6px 20px",
            }}
          >
            website
          </Box>{" "}
          against AI Bots
        </Typography>

        <Typography
          variant="h6"
          gutterBottom
          sx={{
            py: "8px",
            color: "#FFFFFF",
          }}
        >
          Generate a robots.txt file tailored to the platform you use to post
          your content that blocks AI bots
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 4, zIndex: 10 }}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default Hero;
