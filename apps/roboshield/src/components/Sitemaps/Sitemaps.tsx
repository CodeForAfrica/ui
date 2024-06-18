import { Box, TextareaAutosize } from "@mui/material";
import { ChangeEvent, useState } from "react";

import StepperNav from "../StepperNav";

import { useGlobalState } from "@/roboshield/context/GlobalContext";
import { StepComponent } from "@/roboshield/types/stepComponent";

export default function Sitemaps({
  handleNext,
  handleBack,
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

  return (
    <>
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
            width: "96%",
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
