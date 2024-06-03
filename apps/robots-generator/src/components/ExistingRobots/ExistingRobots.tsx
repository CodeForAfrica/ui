import { useState, useEffect } from "react";
import Input from "@/robots-generator/components/Input";
import { Box, Button, Stack, Typography } from "@mui/material";
import { validateUrl } from "@/robots-generator/utils/validateUrl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Alert from "@mui/material/Alert";

interface ExistingRobotsProps {
  onStepValid: (valid: boolean) => void;
}

export default function ExistingRobots({ onStepValid }: ExistingRobotsProps) {
  const [url, setUrl] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(true);
  const [robots, setRobots] = useState("");

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
    console.log({ data });
    return data.robots;
  };

  const fetchData = async () => {
    const robots = await fetchRobots();
    setRobots(robots);
  };

  return (
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
      {!isValid && (
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
  );
}
