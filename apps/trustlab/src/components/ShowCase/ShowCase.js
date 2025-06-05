import { Section } from "@commons-ui/core";
import { Figure, Link } from "@commons-ui/next";
import { LexicalRichText } from "@commons-ui/payload";
import { Box, Button } from "@mui/material";
import React from "react";

function ShowCase({
  direction = "rtl",
  images,
  title,
  description,
  label,
  href,
}) {
  if (!images || images.length < 4) {
    return null;
  }
  const [image1, image2, image3, image4] = images;
  return (
    <Section
      sx={{
        maxWidth: { md: "100%", xs: "100%" },
        bgcolor: "common.black",
        color: "common.white",
        py: 8,
      }}
      fixed={false}
    >
      <Box
        sx={(theme) => ({
          display: "flex",
          flexDirection: {
            xs: "column",
            md: direction === "ltr" ? "row" : "row-reverse",
          },
          justifyContent: "flex-end",
          width: "100%",
          color: "white",
          overflow: "hidden",
          maxWidth: theme.contentWidths.values,
          m: "0 auto",
          gap: 2,
        })}
      >
        <Box
          sx={{
            position: "relative",
            height: { sm: "600px", xs: "360px" },
            width: { xs: "390px", sm: "572px" },
            maxWidth: "572px",
            margin: "0 auto",
          }}
        >
          <Figure
            ImageProps={{
              src: image1.image.src,
              alt: image1.image.alt || "Showcase Image 1",
            }}
            sx={{
              display: {
                sm: "block",
              },
              height: { sm: "253px", xs: "153px" },
              width: { sm: "203px", xs: 121 },
              position: "absolute",
              top: 0,
              left: 80,
            }}
          />
          <Figure
            ImageProps={{
              src: image2.image.src,
              alt: image2.image.alt || "Showcase Image 2",
            }}
            sx={{
              display: {
                sm: "block",
              },
              height: { sm: "253px", xs: "157px" },
              width: { sm: "260px", xs: "157px" },
              position: "absolute",
              right: 20,
              bottom: { sm: "276px", xs: "unset" },
              top: { sm: "unset", xs: "16px" },
            }}
          />
          <Figure
            ImageProps={{
              src: image3.image.src,
              alt: image3.image.alt || "Showcase Image 3",
            }}
            sx={{
              display: {
                sm: "block",
              },
              height: { sm: "260px", xs: "157px" },
              width: { sm: "260px", xs: "157px" },
              position: "absolute",
              top: { sm: "276px", xs: "160px" },
              left: { sm: 0, xs: "32px" },
            }}
          />

          <Figure
            ImageProps={{
              src: image4.image.src,
              alt: image4.image.alt || "Showcase Image 4",
            }}
            sx={{
              display: {
                sm: "block",
              },
              height: { sm: "260px", xs: "157px" },
              width: { sm: "200px", xs: "121px" },
              position: "absolute",
              bottom: { xs: "unset", sm: "0" },
              top: { xs: "176px", sm: "unset" },
              left: { sm: "276px", xs: "200px" },
            }}
          />
        </Box>

        <Box
          flex={1}
          alignItems="center"
          justifyContent="center"
          display="flex"
          sx={{
            px: { xs: 2.5, sm: 0 },
          }}
        >
          <Box
            sx={{
              flex: 1,
              bgcolor: "white",
              color: "black",
              p: { xs: 3, md: 6 },
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              ml: { xs: 0, md: direction === "ltr" ? -10 : 0 },
              mr: { xs: 0, md: direction === "ltr" ? 0 : -10 },
              zIndex: 1,
            }}
          >
            <LexicalRichText
              elements={title}
              TypographyProps={{
                variant: "display3",
                gutterBottom: true,
              }}
            />
            <LexicalRichText
              elements={description}
              TypographyProps={{
                sx: { mb: 3 },
              }}
            />
            <Button
              variant="contained"
              component={href ? Link : undefined}
              href={href}
              sx={{
                bgcolor: "black",
                color: "white",
                fontWeight: "bold",
                px: 4,
                py: 1.5,
                "&:hover": {
                  bgcolor: "#222",
                },
                width: "fit-content",
                mt: 6,
              }}
            >
              {label}
            </Button>
          </Box>
        </Box>
      </Box>
    </Section>
  );
}

export default ShowCase;
