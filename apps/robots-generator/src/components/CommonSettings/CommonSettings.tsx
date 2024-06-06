import {
  Box,
  Stack,
  Select,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import Input from "@/robots-generator/components/Input";
import { startOfToday } from "date-fns";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { useState } from "react";
import Timepicker from "@/robots-generator/components/Timepicker";
import TextArea from "@/robots-generator/components/TextArea";
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

  const [defaultAccess, setDefaultAccess] = useState(state.defaultAccess);
  const [crawlDelay, setCrawlDelay] = useState(state.crawlDelay ?? 0);
  const [cachedDelay, setCachedDelay] = useState(state.cachedDelay ?? 0);
  const [visitTime, setVisitTime] = useState(state.visitTime);
  const [sitemaps, setSitemaps] = useState(state.sitemaps);
  const [disallowedPaths, setDisallowedPaths] = useState(state.disallowedPaths);

  const handleDefaultAccessChange = (event: SelectChangeEvent) => {
    setDefaultAccess(event.target.value as string);
  };

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

  const handleSitemapChange = (value: string) => {
    setSitemaps(value.split("\n"));
  };

  const handleDisallowedPathsChange = (value: string) => {
    setDisallowedPaths(value.split("\n"));
  };

  const next = () => {
    handleNext({
      defaultAccess,
      crawlDelay,
      cachedDelay,
      visitTime,
      sitemaps,
      disallowedPaths,
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
          {/* Default Access */}
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
                whiteSpace: "break-spaces",
              }}
            >
              Default access for robots
              <Tooltip title="This directive specifies the default access policy for robots that visit your site.">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </InputLabel>
            <Select
              sx={{
                width: "100%",
              }}
              value={defaultAccess}
              onChange={handleDefaultAccessChange}
              autoWidth
            >
              <MenuItem
                value="allowed"
                sx={{
                  marginTop: 0,
                }}
              >
                Allowed
              </MenuItem>
              <MenuItem
                value="disallowed"
                sx={{
                  marginTop: 0,
                }}
              >
                Refused
              </MenuItem>
            </Select>
          </Stack>
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
              initialValue={crawlDelay.toString()}
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
              initialValue={cachedDelay.toString()}
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
            <Timepicker value={visitTime} onChange={handleVisitTimeChange} />
          </Stack>
          {/* Sitemaps */}
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
              Sitemaps
              <Tooltip title="The sitemap directive specifies the location of your sitemap.">
                <IconButton>
                  <InfoIcon />
                </IconButton>
              </Tooltip>
            </InputLabel>
            <TextArea
              placeholder="Enter sitemap URLs, each URL on a new line"
              onChange={handleSitemapChange}
              value={sitemaps.join("\n")}
              minRows={5}
              style={{
                maxHeight: "300px",
                width: "96%",
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
                padding: "2%",
                resize: "none",
                overflow: "scroll",
                whiteSpace: "pre",
                overflowWrap: "normal",
                lineHeight: "1.5rem",
              }}
            />
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
            <TextArea
              placeholder="Enter disallowed paths, each path on a new line. They should be relative to the root of your site and end with a /."
              onChange={handleDisallowedPathsChange}
              value={disallowedPaths.join("\n")}
              minRows={5}
              style={{
                maxHeight: "300px",
                width: "96%",
                border: "1px solid #C4C4C4",
                borderRadius: "5px",
                padding: "2%",
                resize: "none",
                overflow: "scroll",
                whiteSpace: "pre",
                overflowWrap: "normal",
                lineHeight: "1.5rem",
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
