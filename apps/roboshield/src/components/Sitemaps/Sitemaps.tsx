import { Box, TextareaAutosize } from "@mui/material";
import { ChangeEvent, useState } from "react";

import StepperNav from "@/roboshield/components/StepperNav";

import { useGlobalState } from "@/roboshield/context/GlobalContext";
import { StepComponent } from "@/roboshield/types/stepComponent";
import SkipToLastStep from "@/roboshield/components/SkipToLastStep";
import StepHint from "@/roboshield/components/StepHint";

export default function Sitemaps({
  handleNext,
  handleBack,
  handleSkipToLast,
  hint,
  lastStep,
}: StepComponent) {
  const { state } = useGlobalState();
  const [sitemaps, setSitemaps] = useState(state.sitemaps);

  const handleSitemapChange = (value: ChangeEvent<HTMLTextAreaElement>) => {
    const data = value.target.value;
    setSitemaps(data.split("\n"));
  };

  const next = () => {
    handleNext({
      sitemaps,
    });
  };

  const skipToLast = () => {
    handleSkipToLast({
      sitemaps,
    });
  };

  return (
    <>
      <SkipToLastStep handleSkipToLast={skipToLast} lastStep={lastStep} />
      <StepHint hint={hint} />
      <Box
        sx={{
          width: "100%",
          py: 2,
        }}
      >
        <TextareaAutosize
          placeholder="Enter sitemap URLs, each URL on a new line"
          onChange={handleSitemapChange}
          value={sitemaps.join("\n")}
          minRows={5}
          style={{
            maxHeight: "300px",
            height: "300px",
            width: "100%",
            border: "1px solid #C4C4C4",
            borderRadius: "5px",
            padding: "2%",
            resize: "none",
            whiteSpace: "pre",
            lineHeight: "1.5rem",
            overflowWrap: "normal",
            overflow: "scroll !important",
          }}
        />
      </Box>
      <StepperNav
        next={next}
        handleBack={handleBack}
        isValid={true}
        lastStep={lastStep}
        back={false}
      />
    </>
  );
}
