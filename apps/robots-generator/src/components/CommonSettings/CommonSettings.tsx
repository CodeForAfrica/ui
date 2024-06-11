import { Box, Stack, InputLabel, TextareaAutosize } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import { ChangeEvent, useState } from "react";
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

  const [disallowedPaths, setDisallowedPaths] = useState(state.disallowedPaths);
  const [allowedPaths, setAllowedPaths] = useState(state.allowedPaths);

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
                maxHeight: "200px",
                height: "200px",
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
                maxHeight: "200px",
                height: "200px",
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
