import Box from "@mui/material/Box/Box";
import Button from "@mui/material/Button";
import React from "react";
import Typography from "@mui/material/Typography";
import ReactRotatingText from "react-rotating-text";

interface props {
  scrolRef: React.RefObject<HTMLDivElement>;
}

const Hero = ({ scrolRef }: props) => {
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
        px: { xs: 2.5, sm: 0 },
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
          Guard your{" "}
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
            <ReactRotatingText
              items={["website", "blog", "content"]}
              cursor={false}
              eraseMode="overwrite"
            />
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
          Generate a robots.txt file tailored to the platform you use to publish
          your content online and blocks AI bots
        </Typography>
        <Button
          variant="outlined"
          onClick={() => {
            scrolRef.current?.scrollIntoView({
              behavior: "smooth",
            });
          }}
          sx={{
            mt: 2,
            mb: 4,
            zIndex: 10,
            color: "#FFFFFF",
            border: "2px solid #FFFFFF",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              border: "2px solid #FFFFFF",
              background: "#FFFFFF",
              color: "#0C1A81",
            },
          }}
        >
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default Hero;