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
            style={{ width: "100%" }}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
