import { Section } from "@commons-ui/core";
import { RichTypography } from "@commons-ui/next";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import ReactRotatingText from "react-rotating-text";

import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import BotIcon from "@/roboshield/assets/icons/Type=robot, Size=24, Color=CurrentColor.svg";

interface props {
  scrolRef: React.RefObject<HTMLDivElement>;
}

const Hero = ({ scrolRef }: props) => {
  return (
    <Box
      component="section"
      sx={{
        textAlign: "center",
        backgroundColor: "primary.dark",
        backgroundImage: "url('/bg-shape-8.svg')",
        backgroundSize: "cover",
        px: { xs: 2.5, sm: 0 },
        py: { xs: 8, md: 13 },
      }}
    >
      <Section>
        <Typography
          typography="h6"
          variant="h2"
          gutterBottom
          sx={{
            py: "8px",
            color: "#FFFFFF",
          }}
        >
          CONTROL YOUR DATA
        </Typography>

        <Typography
          color="text.secondary"
          gutterBottom
          textAlign="center"
          variant="h1"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            py: 1,
          }}
        >
          Guard Your
          <Box
            component="span"
            sx={{
              backgroundColor: "red",
              color: "#FFFFF",
              maxWidth: "fit-content",
              my: {
                xs: 0.5,
                md: 1,
              },
              p: "6px 20px",
              textTransform: "capitalize",
            }}
          >
            <ReactRotatingText
              items={["website", "blog", "content"]}
              cursor={false}
              eraseMode="overwrite"
            />
          </Box>
          Against AI Bots
        </Typography>

        <RichTypography
          LinkProps={{
            color: "text.secondary",
          }}
          color="text.secondary"
          typography="h6"
          variant="h3"
          sx={{
            "& .robots": {
              textDecoration: "none",
              borderColor: "text.secondary",
              border: 1,
              p: 0.5,
            },
            "& .robots:before": {
              fill: "white",
              content: "url('/icons/smarttoy-24-white.svg')",
              display: "inline-block",
              pr: 0.5,
              height: "26.95px", // line-height of typography (h6)
              verticalAlign: "middle",
            },
          }}
        >
          {`Generate a <a href="https://en.wikipedia.org/wiki/Robots.txt" class="robots">robots.txt</a> file tailored to the platform you use to publish your content online and blocks AI bots`}
        </RichTypography>
        <Button
          onClick={() => {
            scrolRef.current?.scrollIntoView({
              behavior: "smooth",
            });
          }}
          size="large"
          variant="contained"
          sx={{
            mt: {
              xs: 4,
              md: 6,
            },
          }}
        >
          Get Started
        </Button>
      </Section>
    </Box>
  );
};

export default Hero;
