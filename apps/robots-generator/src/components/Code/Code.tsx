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
      }}
    >
      <TextareaAutosize
        value={code}
        minRows={10}
        style={{
          width: "100%",
          height: "500px",
          padding: "16px",
          border: "1px solid #C4C4C4",
          marginBottom: "10px",
          borderRadius: "5px",
          fontFamily:
            "Fira Code, Consolas, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace",
          whiteSpace: "pre",
          overflowWrap: "normal",
          resize: "none",
          overflow: "scroll",
          lineHeight: "1.5rem",
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
