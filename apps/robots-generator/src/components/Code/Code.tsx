import { Box, Button, Stack, TextareaAutosize } from "@mui/material";

interface CodeProps {
  code: string;
  onCopy: () => void;
  onDownload: () => void;
  onReset: () => void;
  showButtons?: boolean;
}

export default function Code(props: CodeProps) {
  const { code, onCopy, onDownload, onReset, showButtons = false } = props;

  return (
    <Box
      sx={{
        width: "100%",
        height: "500px",
      }}
    >
      <TextareaAutosize
        value={code}
        minRows={10}
        style={{
          width: "100%",
          height: "100%",
          fontFamily:
            "Fira Code, Consolas, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace",
          whiteSpace: "pre-wrap",
          resize: "none",
        }}
      />

      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={onCopy}
          disabled={!showButtons}
        >
          Copy to Clipboard
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}
          onClick={onDownload}
          disabled={!showButtons}
        >
          Download
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 2 }}
          onClick={onReset}
          disabled={!showButtons}
        >
          Reset
        </Button>
      </Stack>
    </Box>
  );
}
