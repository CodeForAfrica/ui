import { useState } from "react";
import Input from "@/robots-generator/components/Input";
import { Box, Button, Snackbar, Stack, Typography } from "@mui/material";
import { validateUrl } from "@/robots-generator/utils/urls";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Alert from "@mui/material/Alert";
import StepperNav from "@/robots-generator/components/StepperNav";
import { useGlobalState } from "@/robots-generator/context/GlobalContext";

interface ExistingRobotsProps {
  handleNext: (data: any) => void;
  handleBack: () => void;
  lastStep: boolean;
}

export default function ExistingRobots({
  handleNext,
  handleBack,
  lastStep,
}: ExistingRobotsProps) {
  const { state } = useGlobalState();
  const [url, setUrl] = useState(state.url);
  const [isValid, setIsValid] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(state.shouldFetch);
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
    const { robots, error } = await fetchRobots();
    if (error) {
      setRobotsError(true);
      return;
    }
    setRobots(robots);
    setAllowNextStep(true);
  };

  const next = () => {
    handleNext({
      url,
      shouldFetch,
      ...robots,
    });
  };

  return (
    <>
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
            label={<Typography>Fetch existing robots.txt</Typography>}
          />
        </FormGroup>
        <Stack spacing={2} direction="row">
          <Input
            label="Enter URL"
            onChange={onInputChange}
            placeholder="https://example.com"
            sx={{ width: "100%" }}
            disabled={!shouldFetch}
            initialValue={url}
          />
          <Button
            variant="contained"
            color="primary"
            sx={{}}
            disabled={!shouldFetch || !isValid}
            onClick={fetchData}
          >
            Fetch
          </Button>
        </Stack>
        {!isValid && shouldFetch && (
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
            Please enter a valid URL. A valid URL should start with http:// or
            https://
          </Alert>
        )}
      </Box>
      <StepperNav
        next={next}
        handleBack={handleBack}
        isValid={allowNextStep || !shouldFetch}
        lastStep={lastStep}
        back={true}
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
