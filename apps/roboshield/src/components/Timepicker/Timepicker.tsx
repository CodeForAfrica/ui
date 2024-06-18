import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

interface TimepickerProps {
  value: Date | null;

  onChange: (newValue: Date | null) => void;
  label: string;
}

export default function Timepicker({
  value,
  onChange,
  label,
}: TimepickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        value={value}
        sx={{
          width: "100%",
        }}
        onChange={onChange}
        label={label}
      />
    </LocalizationProvider>
  );
}
