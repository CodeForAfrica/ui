import { Box, Button, Stack } from "@mui/material";

import CodeEditor from "./CodeEditor";

interface CodeProps {
  code: string;
  onCodeChange: (newCode: string) => void;
  onCopy: () => void;
  onDownload: () => void;
  onReset: () => void;
  onBack: () => void;
  showButtons?: boolean;
}

export default function Code(props: CodeProps) {
  const {
    code,
    onCopy,
    onDownload,
    onReset,
    onCodeChange,
    onBack,
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

      <Stack
        direction={{
          xs: "column",
          sm: "row",
        }}
        spacing={2}
      >
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
          sx={{
            mt: 2,
            background: "#000000",
            border: "1px solid #000000",
            "&:hover": {
              background: "none",
              color: "#000000",
            },
          }}
          onClick={onDownload}
          disabled={!showButtons}
        >
          Download
        </Button>
        <Button
          variant="outlined"
          color="primary"
          sx={{
            mt: 2,
          }}
          onClick={onBack}
          disabled={!showButtons}
        >
          Back
        </Button>
        <Button
          variant="contained"
          sx={{
            mt: 2,
            background: "#FE2500",
            border: "1px solid #FE2500",
            "&:hover": {
              background: "none",
              color: "#FE2500",
            },
          }}
          onClick={onReset}
          disabled={!showButtons}
        >
          Reset
        </Button>
      </Stack>
    </Box>
  );
}
