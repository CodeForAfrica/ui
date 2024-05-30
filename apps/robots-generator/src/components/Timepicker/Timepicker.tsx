import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

interface TimepickerProps {
  value: Date;
  onChange: (newValue: Date | null) => void;
}

export default function Timepicker({ value, onChange }: TimepickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        value={value}
        sx={{
          width: "100%",
        }}
        onChange={onChange}
      />
    </LocalizationProvider>
  );
}
