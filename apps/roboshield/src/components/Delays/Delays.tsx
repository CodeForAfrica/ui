import InfoIcon from "@mui/icons-material/Info";
import { Box, IconButton, InputLabel, Stack, Tooltip } from "@mui/material";
import { useState } from "react";

import StepperNav from "@/roboshield/components/StepperNav";
import TimePicker from "@/roboshield/components/TimePicker";

import Input from "@/roboshield/components/Input";
import { useGlobalState } from "@/roboshield/context/GlobalContext";
import { StepComponent } from "@/roboshield/types/stepComponent";
import SkipToLastStep from "@/roboshield/components/SkipToLastStep";
import StepHint from "@/roboshield/components/StepHint";

export default function Delays({
  handleNext,
  handleBack,
  handleSkipToLast,
  hint,
  lastStep,
  labels,
  globalLabels,
}: StepComponent) {
  const { state } = useGlobalState();

  const [crawlDelay, setCrawlDelay] = useState(state.crawlDelay);
  const [cachedDelay, setCachedDelay] = useState(state.cachedDelay);
  const [visitTimeFrom, setVisitTime] = useState(state.visitTimeFrom);
  const [visitTimeTo, setVisitTimeTo] = useState(state.visitTimeTo);

  const handleCrawlDelayChange = (value: string) => {
    setCrawlDelay(parseInt(value));
  };

  const handleCacheDelayChange = (value: string) => {
    setCachedDelay(parseInt(value));
  };

  const handleVisitTimeChange = (value: Date | null) => {
    if (value === null) {
      return;
    }
    setVisitTime(value);
  };

  const handleVisitTimeToChange = (value: Date | null) => {
    if (value === null) {
      return;
    }
    setVisitTimeTo(value);
  };

  const next = () => {
    handleNext({
      crawlDelay,
      cachedDelay,
      visitTimeFrom,
      visitTimeTo,
    });
  };

  const skipToLast = () => {
    handleSkipToLast({
      crawlDelay,
      cachedDelay,
      visitTimeFrom,
      visitTimeTo,
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
        <Stack
          spacing={2}
          alignItems="center"
          justifyContent="space-between"
          direction={{
            xs: "column",
            md: "row",
          }}
          sx={{ width: "100%", mb: 2 }}
        >
          <Stack spacing={2} alignItems="center" sx={{ width: "100%", mb: 2 }}>
            <InputLabel
              sx={{
                color: "text.primary",
                fontSize: "16px",
                width: "100%",
              }}
            >
              {labels?.crawlDelay?.label}
              <Tooltip title={labels?.crawlDelay?.title}>
                <IconButton color="info">
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </InputLabel>
            <Input
              onChange={handleCrawlDelayChange}
              initialValue={crawlDelay ? crawlDelay.toString() : ""}
              sx={{ width: "100%" }}
            />
          </Stack>
          <Stack spacing={2} alignItems="center" sx={{ width: "100%", mb: 2 }}>
            <InputLabel
              sx={{
                color: "text.primary",
                fontSize: "16px",
                width: "100%",
              }}
            >
              {labels?.cacheDelay?.label}
              <Tooltip title={labels?.cacheDelay?.title}>
                <IconButton color="info">
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </InputLabel>
            <Input
              onChange={handleCacheDelayChange}
              initialValue={cachedDelay ? cachedDelay.toString() : ""}
              sx={{ width: "100%" }}
            />
          </Stack>
        </Stack>
        <Stack spacing={2} alignItems="center" sx={{ width: "100%", mb: 2 }}>
          <InputLabel
            sx={{
              color: "text.primary",
              fontSize: "16px",
              width: "100%",
            }}
          >
            {labels?.visitTime?.label}
            <Tooltip title={labels?.visitTime?.title}>
              <IconButton color="info">
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </InputLabel>
          <Stack
            spacing={1}
            direction="row"
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <TimePicker
              value={visitTimeFrom}
              onChange={handleVisitTimeChange}
              label="From"
            />
            <TimePicker
              label="To"
              value={visitTimeTo}
              onChange={handleVisitTimeToChange}
            />
          </Stack>
        </Stack>
      </Box>
      <StepperNav
        next={next}
        handleBack={handleBack}
        isValid={true}
        lastStep={lastStep}
        back={false}
        labels={globalLabels}
      />
    </>
  );
}
