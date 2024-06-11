import {
  Box,
  Stack,
  InputLabel,
  TextareaAutosize,
  SelectChangeEvent,
  Select,
  MenuItem,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { ChangeEvent, useState } from "react";
import StepperNav from "@/robots-generator/components/StepperNav";
import { useGlobalState } from "@/robots-generator/context/GlobalContext";
import { platforms } from "@/robots-generator/lib/config";

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

  const [disallowedPaths, setDisallowedPaths] = useState(state.disallowedPaths);
  const [allowedPaths, setAllowedPaths] = useState(state.allowedPaths);
  const [platform, setPlatform] = useState(state.platform);

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
  const handlePlatformChange = (event: SelectChangeEvent) => {
    setPlatform(event.target.value as string);
  };

  const next = () => {
    handleNext({
      disallowedPaths,
      allowedPaths,
      platform,
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
        {/* Disallowed paths */}
        <Stack spacing={2} alignItems="center" sx={{ width: "100%", mb: 2 }}>
          <InputLabel
            sx={{
              color: "text.primary",
              fontSize: "16px",
              width: "100%",
            }}
          >
            Disallowed paths
            <Tooltip title="The disallowed paths directive specifies the paths that a bot should not visit.">
              <IconButton color="info">
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </InputLabel>
          <TextareaAutosize
            placeholder="Enter disallowed paths, each path on a new line."
            onChange={handleDisallowedPathsChange}
            value={disallowedPaths.join("\n")}
            minRows={5}
            style={{
              maxHeight: "200px",
              height: "200px",
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
        </Stack>
        <Stack spacing={2} alignItems="center" sx={{ width: "100%", mb: 2 }}>
          <InputLabel
            sx={{
              color: "text.primary",
              fontSize: "16px",
              width: "100%",
            }}
          >
            Allowed paths
            <Tooltip title="The allowed paths directive specifies the paths that a bot should visit.">
              <IconButton color="info">
                <InfoIcon />
              </IconButton>
            </Tooltip>
          </InputLabel>
          <TextareaAutosize
            placeholder="Enter allowed paths, each path on a new line."
            onChange={handleAllowedPathsChange}
            value={allowedPaths.join("\n")}
            minRows={5}
            style={{
              maxHeight: "200px",
              height: "200px",
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
        </Stack>
        {/* Platform */}
        <Stack spacing={2} alignItems="center" sx={{ width: "100%", mb: 2 }}>
          <InputLabel
            sx={{
              color: "text.primary",
              fontSize: "16px",
              width: "100%",
            }}
          >
            Select platform
            <Tooltip title="Select the platform your website is built on to generate the correct robots.txt file.">
              <IconButton size="small" color="info">
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
