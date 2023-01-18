import { Section } from "@commons-ui/core";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import Image from "next/image";
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
    <Section
      ref={ref}
      sx={{ px: { xs: 5, sm: 0 }, py: { xs: 5, md: "74.5px" } }}
    >
      <Box display="flex" justifyContent="center" alignItems="center">
        <Box
          flex={1.2}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="start"
          sx={{ gap: 5 }}
        >
          <LineClampedRichTypography
            component="h1"
            textAlign="start"
            typography={{ md: "h1" }}
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
          <Image
            {...image}
            alt={title}
            layout="responsive"
            width={329}
            height={512}
          />

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
