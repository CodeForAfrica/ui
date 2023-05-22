import { Section } from "@commons-ui/core";
import { Typography, Box } from "@mui/material";

function Dataset({ title }) {
  return (
    <Box
      sx={{
        backgroundColor: "#fff",
      }}
    >
      <Section sx={{}}>
        <Typography variant="h3">{title}</Typography>
      </Section>
    </Box>
  );
}

export default Dataset;
