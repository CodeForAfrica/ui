import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export function Demo1() {
  return (
    <div>
      <h1>Demo 1</h1>
      <p>This is a demo component with MUI components belows.</p>

      <Stack spacing={2} direction="row">
        <Button variant="text">Text</Button>
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
      </Stack>
    </div>
  );
}
