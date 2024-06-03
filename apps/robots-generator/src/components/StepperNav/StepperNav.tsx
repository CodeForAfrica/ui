import { Box, Button } from "@mui/material";

interface StepperNavProps {
  next: () => void;
  handleBack: () => void;
  isValid: boolean;
  lastStep: boolean;
  back?: boolean;
}

export default function StepperNav({
  next,
  handleBack,
  isValid,
  lastStep,
  back = false,
}: StepperNavProps) {
  return (
    <Box sx={{ my: 2 }}>
      <div>
        <Button
          variant="contained"
          onClick={next}
          sx={{ mt: 1, mr: 1 }}
          disabled={!isValid}
        >
          {lastStep ? "Finish" : "Continue"}
        </Button>
        <Button disabled={back} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
          Back
        </Button>
      </div>
    </Box>
  );
}
