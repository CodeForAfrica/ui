import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

interface TestPageProps {}

export default function TestPage(props: TestPageProps) {
  return (
    <div>
      <Stack direction="row" spacing={2}>
        <Button variant="contained">Contained</Button>
        <Button variant="contained" disabled>
          Disabled
        </Button>
        <Button variant="contained" href="#contained-buttons">
          Link
        </Button>
      </Stack>
      <Button variant="contained">Hello world</Button>
    </div>
  );
}
