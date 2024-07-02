import { Box, Button } from "@mui/material";

interface StepperNavProps {
  next: () => void;
  handleBack: () => void;
  isValid: boolean;
  lastStep: boolean;
  back?: boolean;
  labels?: { [key: string]: string };
}

export default function StepperNav({
  next,
  handleBack,
  isValid,
  lastStep,
  back = false,
  labels,
}: StepperNavProps) {
  return (
    <Box sx={{ my: 2 }}>
      <div>
        {!lastStep && (
          <>
            <Button
              variant="contained"
              onClick={next}
              sx={{ mt: 1, mr: 1 }}
              disabled={!isValid}
            >
              {labels?.continue}
            </Button>
            <Button disabled={back} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
              {labels?.back}
            </Button>
          </>
        )}
      </div>
    </Box>
  );
}
