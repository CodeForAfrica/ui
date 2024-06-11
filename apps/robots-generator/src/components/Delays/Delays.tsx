import { useGlobalState } from "@/robots-generator/context/GlobalContext";
import { Box, IconButton, InputLabel, Stack, Tooltip } from "@mui/material";
import { useState } from "react";
import Timepicker from "../Timepicker";
import InfoIcon from "@mui/icons-material/Info";
import StepperNav from "../StepperNav";
import Input from "@/robots-generator/components/Input";

interface DelaysProps {
  handleNext: (data: any) => void;
  handleBack: () => void;
  lastStep: boolean;
}
export default function Delays({
  handleNext,
  handleBack,
  lastStep,
}: DelaysProps) {
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
  return (
    <>
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
              Crawl delay
              <Tooltip title="The crawl delay directive specifies the minimum time between requests to your server from a bot.">
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
              Cache delay
              <Tooltip title="The cache delay directive specifies the time that a cached copy of a page should be considered fresh.">
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
            Visit time
            <Tooltip title="The visit time directive specifies the time of day when a bot should visit your site.">
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
            <Timepicker
              value={visitTimeFrom}
              onChange={handleVisitTimeChange}
              label="From"
            />
            <Timepicker
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
      />
    </>
  );
}
