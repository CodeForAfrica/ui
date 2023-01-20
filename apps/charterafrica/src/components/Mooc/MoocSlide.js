import { Section } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import React, { useRef } from "react";

import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";

const MoocSlide = React.forwardRef(function MoocSlide(props, ref) {
  const { title, image, link, activeStep, setActiveStep, slides } = props;

  const stepperRef = useRef();
  React.useEffect(() => {
    if (stepperRef.current) {
      const dotsEl = stepperRef.current.getElementsByClassName(
        "MuiMobileStepper-dots"
      )[0];
      if (dotsEl) {
        dotsEl.childNodes.forEach((dotEl, i) => {
          dotEl.addEventListener("click", () => setActiveStep(i));
        });
      }
    }
  }, [stepperRef, setActiveStep]);

  if (!title || !image || !link) {
    return null;
  }

  return (
    <Section ref={ref} sx={{ px: { xs: 5, sm: 0 }, py: { xs: 5, md: "86px" } }}>
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

          <MobileStepper
            variant="dots"
            steps={slides}
            position="static"
            activeStep={activeStep}
            sx={{
              bgcolor: "neutral.dark",
              flexGrow: 1,
              justifyContent: "center",
              p: 1.25,
              "& .MuiMobileStepper-dots": {
                gap: "20px",
              },
              "& .MuiMobileStepper-dot": {
                bgcolor: "secondary.main",
                border: 1,
                borderColor: "secondary.main",
                height: 8,
                width: 8,
                "& :hover": {
                  cursor: "pointer",
                },
              },
              "& .MuiMobileStepper-dotActive": {
                bgcolor: "#fff",
                borderColor: "#fff",
                height: 10,
                width: 10,
              },
            }}
            ref={stepperRef}
          />
        </Box>
      </Box>
    </Section>
  );
});

export default MoocSlide;
