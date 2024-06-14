import { Box, Button, Stack, TextareaAutosize } from "@mui/material";
import CodeEditor from "./CodeEditor";

interface CodeProps {
  code: string;
  onCodeChange: (newCode: string) => void;
  onCopy: () => void;
  onDownload: () => void;
  onReset: () => void;
  showButtons?: boolean;
}

export default function Code(props: CodeProps) {
  const {
    code,
    onCopy,
    onDownload,
    onReset,
    onCodeChange,
    showButtons = false,
  } = props;

  const handleCodeChange = (newCode: string) => {
    onCodeChange(newCode);
  };

  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <CodeEditor code={code} setCode={handleCodeChange} readOnly={false} />

      <Stack direction="row" spacing={2}>
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
