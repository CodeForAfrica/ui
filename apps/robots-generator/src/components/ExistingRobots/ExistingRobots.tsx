import { useState, useEffect } from "react";
import Input from "@/robots-generator/components/Input";
import { Box, Typography } from "@mui/material";
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

  const onInputChange = (e: string) => {
    const isValid = validateUrl(e);
    if (isValid) {
      setIsValid(true);
      setUrl(e);
    } else {
      setIsValid(false);
    }
  };

  useEffect(() => {
    if (shouldFetch) {
      onStepValid(isValid);
    } else {
      onStepValid(true);
    }
  }, [isValid, shouldFetch]);

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
      <Input
        label="Enter URL"
        onChange={onInputChange}
        placeholder="https://example.com"
        sx={{ width: "100%" }}
        disabled={!shouldFetch}
      />
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
