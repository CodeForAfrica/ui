import { Box, Button, Snackbar, Stack, Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import { useState } from "react";

import Input from "@/roboshield/components/Input";
import StepperNav from "@/roboshield/components/StepperNav";
import { useGlobalState } from "@/roboshield/context/GlobalContext";
import { StepComponent } from "@/roboshield/types/stepComponent";
import { validateUrl } from "@/roboshield/utils/urls";
import SkipToLastStep from "@/roboshield/components/SkipToLastStep";
import StepHint from "@/roboshield/components/StepHint";
import { RichTypography } from "@commons-ui/core";

interface Props extends StepComponent {
  existingRobotsTxt?: string;
  placeholder?: string;
  fetch?: string;
  urlValidationError?: string;
  defaultFetchExistingRobots?: boolean;
}
export default function ExistingRobots({
  existingRobotsTxt,
  fetch: fetchLabel,
  actions,
  handleNext,
  handleBack,
  handleSkipToLast,
  hint,
  lastStep,
  placeholder,
  urlValidationError,
  defaultFetchExistingRobots,
}: Props) {
  const { state } = useGlobalState();
  const [url, setUrl] = useState(state.url);
  const [isValid, setIsValid] = useState(false);
  const [showURLError, setShowURLError] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(defaultFetchExistingRobots);
  const [robots, setRobots] = useState(state.robots);
  const [allowNextStep, setAllowNextStep] = useState(false);
  const [robotsError, setRobotsError] = useState(false);

  const onInputChange = (e: string) => {
    const isValid = validateUrl(e);
    if (isValid) {
      setIsValid(true);
      setUrl(e);
    } else {
      setIsValid(false);
    }
  };

  const fetchRobots = async () => {
    const res = await fetch("/api/fetch_robots", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    return data;
  };

  const fetchData = async () => {
    if (!isValid) {
      setShowURLError(true);
      return;
    } else {
      setShowURLError(false);
      const { robots, error } = await fetchRobots();
      if (error) {
        setRobotsError(true);
        return;
      }
      setRobots(robots);
      setAllowNextStep(true);
    }
  };

  const next = () => {
    handleNext({
      url,
      shouldFetch,
      ...robots,
    });
  };

  const skipToLast = () => {
    handleSkipToLast({
      url,
      shouldFetch,
      ...robots,
    });
  };

  return (
    <>
      <SkipToLastStep
        handleSkipToLast={skipToLast}
        lastStep={lastStep}
        showRobotsTxt={actions?.showRobotsTxt}
      />
      <StepHint hint={hint} />
      <Box sx={{ py: 2 }}>
        <FormGroup
          sx={{
            mb: 2,
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={shouldFetch}
                onChange={(e) => setShouldFetch(e.target.checked)}
                name="fetch"
                sx={{
                  color: "primary.main",
                  "&.Mui-checked": {
                    color: "primary.main",
                  },
                }}
              />
            }
            label={<RichTypography>{existingRobotsTxt}</RichTypography>}
          />
        </FormGroup>
        <Stack spacing={2} direction="row">
          <Input
            onChange={onInputChange}
            placeholder={placeholder}
            sx={{ width: "100%" }}
            disabled={!shouldFetch}
            initialValue={url}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{}}
            disabled={!shouldFetch}
            onClick={fetchData}
          >
            {fetchLabel}
          </Button>
        </Stack>
        {showURLError && (
          <Alert
            severity="error"
            sx={{
              mt: {
                xs: 2,
                md: 3,
              },
              fontSize: {
                xs: "0.875rem",
                md: "1rem",
              },
            }}
          >
            {urlValidationError}
          </Alert>
        )}
      </Box>
      <StepperNav
        next={next}
        handleBack={handleBack}
        isValid={allowNextStep || !shouldFetch}
        lastStep={lastStep}
        back={true}
        labels={actions}
      />
      <Snackbar
        open={robotsError}
        autoHideDuration={5000}
        onClose={() => setRobotsError(false)}
        message="Error fetching robots.txt file. Please try again."
      />
    </>
  );
}
