import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { TimePicker as MuiTimePicker } from "@mui/x-date-pickers/TimePicker";

interface TimePickerProps {
  value: Date | null;

  onChange: (newValue: Date | null) => void;
  label: string;
}

export default function TimePicker({
  value,
  onChange,
  label,
}: TimePickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MuiTimePicker
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
