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

import { useState, useEffect } from "react";
import Timepicker from "@/robots-generator/components/Timepicker";
import TextArea from "@/robots-generator/components/TextArea";

interface CommonSettingsProps {
  onStepValid: (valid: boolean) => void;
}

export default function CommonSettings({ onStepValid }: CommonSettingsProps) {
  const [defaultAccess, setDefaultAccess] = useState("disallowed");
  const [crawlDelay, setCrawlDelay] = useState(10);
  const [cachedDelay, setCachedDelay] = useState(10);
  const [visitTime, setVisitTime] = useState(startOfToday());
  const [sitemaps, setSitemaps] = useState<string[]>([]);
  const [disallowedPaths, setDisallowedPaths] = useState<string[]>([]);

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

  useEffect(() => {
    onStepValid(true);
    // if (defaultAccess === "disallowed") {
    //   onStepValid(true);
    // } else {
    //   onStepValid(sitemaps.length > 0);
    // }
  }, [defaultAccess, sitemaps, crawlDelay]);

  return (
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
            }}
          >
            Default access for robots
          </InputLabel>
          <Select
            sx={{
              width: "100%",
            }}
            value={defaultAccess}
            onChange={handleDefaultAccessChange}
            autoWidth
          >
            <MenuItem value="allowed">Allowed</MenuItem>
            <MenuItem value="disallowed">Refused</MenuItem>
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
          </InputLabel>
          <TextArea
            placeholder="Enter sitemap URLs, each URL on a new line"
            onChange={handleSitemapChange}
            value={sitemaps.join("\n")}
            minRows={5}
            style={{ width: "100%" }}
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
          </InputLabel>
          <TextArea
            placeholder="Enter disallowed paths, each path on a new line"
            onChange={handleDisallowedPathsChange}
            value={disallowedPaths.join("\n")}
            minRows={5}
            style={{ width: "100%" }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
