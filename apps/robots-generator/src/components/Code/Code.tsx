import { Box, TextareaAutosize } from "@mui/material";

export default function Code() {
  return (
    <Box sx={{ width: "100%", height: "100%", minHeight: "500px" }}>
      <TextareaAutosize
        minRows={10}
        style={{ width: "100%", height: "100%" }}
      />
    </Box>
  );
}
