import {
  Box,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { useState } from "react";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import StepperNav from "../StepperNav";
import { useGlobalState } from "@/robots-generator/context/GlobalContext";
interface PlatformSettingsProps {
  handleNext: (data: any) => void;
  handleBack: () => void;
  lastStep: boolean;
}

export default function PlatformSettings({
  handleNext,
  handleBack,
  lastStep,
}: PlatformSettingsProps) {
  const { state } = useGlobalState();
  const platforms = [
    {
      name: "none",
      label: "None",
    },
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

  const [platform, setPlatform] = useState(state.platform);

  const handlePlatformChange = (event: SelectChangeEvent) => {
    setPlatform(event.target.value as string);
  };

  const next = () => {
    handleNext({
      platform,
    });
  };

  return (
    <>
      <Box sx={{ py: 2 }}>
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
            <Tooltip title="Select the platform your website is built on to generate the correct robots.txt file.">
              <IconButton size="small">
                <InfoIcon />
              </IconButton>
            </Tooltip>
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
              <MenuItem
                value={platform.name}
                key={platform.name}
                sx={{
                  marginTop: 0,
                }}
              >
                {platform.label}
              </MenuItem>
            ))}
          </Select>
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
