import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { useState } from "react";

export default function PlatformSettings() {
  const platforms = [
    {
      name: "wordpress",
      label: "WordPress",
    },
    {
      name: "squarespace",
      label: "Squarespace",
    },
    {
      name: "wix",
      label: "Wix",
    },
    {
      name: "weebly",
      label: "Weebly",
    },
    {
      name: "joomla",
      label: "Joomla",
    },
    {
      name: "drupal",
      label: "Drupal",
    },
    {
      name: "webflow",
      label: "Webflow",
    },
  ];

  const [platform, setPlatform] = useState("");

  const handlePlatformChange = (event: SelectChangeEvent) => {
    setPlatform(event.target.value as string);
  };

  return (
    <Box>
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
          Select platform
        </InputLabel>
        <Select
          sx={{
            width: "100%",
          }}
          value={platform}
          onChange={handlePlatformChange}
          autoWidth
        >
          {platforms.map((platform) => (
            <MenuItem value={platform.name}>{platform.label}</MenuItem>
          ))}
        </Select>
      </Stack>
    </Box>
  );
}
