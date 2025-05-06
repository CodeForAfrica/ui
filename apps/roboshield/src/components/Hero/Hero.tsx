import RichText from "@/roboshield/components/RichText";
import { Section } from "@commons-ui/core";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import ReactRotatingText from "react-rotating-text";
import { Theme } from "@mui/material";
import { SiteHero } from "@/root/payload-types";

const Hero = (props: SiteHero) => {
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
        {props.heroHeaders?.map((header) => (
          <div key={header.id}>
            {header.headingType === "subHeading" && (
              <Typography
                key={header.id}
                color="text.secondary"
                gutterBottom
                typography="h6"
                variant="h2"
              >
                {header.title}
              </Typography>
            )}
            {header.headingType === "largeHeading" && (
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
                }}
              >
                {header.title}
              </Typography>
            )}
            {header.headingType === "rotatingText" && (
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
                }}
              >
                <Box
                  component="span"
                  sx={{
                    backgroundColor: "red",
                    color: "text.secondary",
                    maxWidth: "fit-content",
                    p: "6px 20px",
                    textTransform: "capitalize",
                  }}
                >
                  <ReactRotatingText
                    items={header?.title?.split(",").map((part) => part.trim())}
                    cursor={false}
                    eraseMode="overwrite"
                  />
                </Box>
              </Typography>
            )}
          </div>
        ))}

        <RichText
          color="text.secondary"
          typographyProps={{
            LinkProps: {
              color: "text.secondary",
              sx: {
                textDecorationColor: "text.secondary",
              },
            },
          }}
          sx={(theme: Theme) => ({
            a: {
              textDecoration: "none",
              padding: "0.5em",
              margin: { md: "0.5em", xs: "0.75em" },
              display: "inline-block",
              border: "1px solid",
              borderColor: "white",
              color: "inherit",
              font: "inherit",
              fontSize: "inherit",
              fontWeight: "inherit",
            },
            mt: "2.5em",
          })}
          elements={props.heroDescription}
        />

        <Button
          onClick={() => {
            const element = document.getElementById("robots-txt-generator");
            element?.scrollIntoView({
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
          {props.heroCallToAction}
        </Button>
      </Section>
    </Box>
  );
};

export default Hero;
