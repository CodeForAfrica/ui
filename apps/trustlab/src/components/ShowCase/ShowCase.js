import { Box, Typography, Button, Stack } from "@mui/material";
import { Section } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import React from "react";

const ShowCase = ({ direction = "row" }) => {
  return (
    <Section
      sx={{
        maxWidth: { md: "100%", xs: "100%" },
        bgcolor: "common.black",
        color: "common.white",
        py: 4,
      }}
      fixed={false}
    >
      <Box
        sx={(theme) => ({
          display: "flex",
          flexDirection: {
            xs: "column",
            md: direction,
          },
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
            height: "600px",
            width: { xs: "100%", md: "572px" },
            maxWidth: "572px",
            margin: "0 auto",
          }}
        >
          <Figure
            ImageProps={{
              src: "/images/4.png",
              alt: "Code Africa Logo",
            }}
            sx={{
              display: {
                sm: "block",
              },
              height: "260px",
              width: "203px",
              position: "absolute",
              top: 0,
              left: 80,
            }}
          />
          <Figure
            ImageProps={{
              src: "/images/3.png",
              alt: "Code Africa Logo",
            }}
            sx={{
              display: {
                sm: "block",
              },
              height: "253px",
              width: "260px",
              position: "absolute",
              right: 20,
              bottom: "276px",
            }}
          />
          <Figure
            ImageProps={{
              src: "/images/2.png",
              alt: "Code Africa Logo",
            }}
            sx={{
              display: {
                sm: "block",
              },
              height: "260px",
              width: "260px",
              position: "absolute",
              top: "276px",
              left: 0,
            }}
          />

          <Figure
            ImageProps={{
              src: "/images/1.png",
              alt: "Code Africa Logo",
            }}
            sx={{
              display: {
                sm: "block",
              },
              height: "260px",
              width: "200px",
              position: "absolute",
              bottom: 0,
              left: "276px",
            }}
          />
        </Box>

        <Box
          flex={1}
          alignItems="center"
          justifyContent={"center"}
          display="flex"
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
              ml: { xs: 0, md: -10 },
              zIndex: 1,
            }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Digital Security Course
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Enrol in our digital security course and gain expert guidance to
              safeguard yourself and your community from digital threats
            </Typography>
            <Button
              variant="contained"
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
              }}
            >
              START LEARNING
            </Button>
          </Box>
        </Box>
      </Box>
    </Section>
  );
};

export default ShowCase;
