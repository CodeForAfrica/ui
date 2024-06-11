import { Box, Stack, InputLabel, TextareaAutosize } from "@mui/material";
import Input from "@/robots-generator/components/Input";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { ChangeEvent, useState } from "react";
import Timepicker from "@/robots-generator/components/Timepicker";
import StepperNav from "@/robots-generator/components/StepperNav";
import { useGlobalState } from "@/robots-generator/context/GlobalContext";

interface CommonSettingsProps {
  handleNext: (data: any) => void;
  handleBack: () => void;
  lastStep: boolean;
}

export default function CommonSettings({
  handleNext,
  handleBack,
  lastStep,
}: CommonSettingsProps) {
  const { state } = useGlobalState();

  const [crawlDelay, setCrawlDelay] = useState(state.crawlDelay);
  const [cachedDelay, setCachedDelay] = useState(state.cachedDelay);
  const [visitTimeFrom, setVisitTime] = useState(state.visitTimeFrom);
  const [visitTimeTo, setVisitTimeTo] = useState(state.visitTimeTo);
  const [disallowedPaths, setDisallowedPaths] = useState(state.disallowedPaths);
  const [allowedPaths, setAllowedPaths] = useState(state.allowedPaths);

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

  const handleDisallowedPathsChange = (
    value: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const data = value.target.value;
    setDisallowedPaths(data.split("\n"));
  };

  const handleAllowedPathsChange = (
    value: ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const data = value.target.value;
    setAllowedPaths(data.split("\n"));
  };

  const next = () => {
    handleNext({
      crawlDelay,
      cachedDelay,
      visitTimeFrom,
      visitTimeTo,
      disallowedPaths,
      allowedPaths,
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
        <Stack spacing={2} alignItems="center">
          {/* Crawl delay */}
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <InputLabel
              sx={{
                color: "text.primary",
                fontSize: "16px",
                width: "100%",
              }}
            >
              Crawl delay
              <Tooltip title="The crawl delay directive specifies the minimum time between requests to your server from a bot.">
                <IconButton>
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
          {/* Cache delay */}
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <InputLabel
              sx={{
                color: "text.primary",
                fontSize: "16px",
                width: "100%",
              }}
            >
              Cache delay
              <Tooltip title="The cache delay directive specifies the time that a cached copy of a page should be considered fresh.">
                <IconButton>
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
          {/* Visit time */}
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <InputLabel
              sx={{
                color: "text.primary",
                fontSize: "16px",
                width: "100%",
              }}
            >
              Visit time
              <Tooltip title="The visit time directive specifies the time of day when a bot should visit your site.">
                <IconButton>
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
          {/* Disallowed paths */}
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <InputLabel
              sx={{
                color: "text.primary",
                fontSize: "16px",
                width: "100%",
              }}
            >
              Disallowed paths
              <Tooltip title="The disallowed paths directive specifies the paths that a bot should not visit.">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </InputLabel>
            <TextareaAutosize
              placeholder="Enter disallowed paths, each path on a new line. They should be relative to the root of your site and end with a /."
              onChange={handleDisallowedPathsChange}
              value={disallowedPaths.join("\n")}
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
          </Stack>
          {/* Allowed paths */}
          <Stack
            spacing={2}
            direction="row"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            <InputLabel
              sx={{
                color: "text.primary",
                fontSize: "16px",
                width: "100%",
              }}
            >
              Allowed paths
              <Tooltip title="The allowed paths directive specifies the paths that a bot should visit.">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </InputLabel>
            <TextareaAutosize
              placeholder="Enter allowed paths, each path on a new line. They should be relative to the root of your site and end with a /."
              onChange={handleAllowedPathsChange}
              value={allowedPaths.join("\n")}
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
