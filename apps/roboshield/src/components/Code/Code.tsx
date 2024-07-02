import { Box, Button, Grid, Stack } from "@mui/material";

import CodeEditor from "./CodeEditor";

interface CodeProps {
  code: string;
  onCodeChange: (newCode: string) => void;
  onCopy: () => void;
  onDownload: () => void;
  onReset: () => void;
  onBack: () => void;
  showButtons?: boolean;
  labels?: { [key: string]: any };
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
    labels,
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
      <Grid container spacing={2}>
        <Grid item md={8} xs={12}>
          <Stack
            direction={{
              xs: "column",
              md: "row",
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
              {labels?.copyToClipboard}
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
              {labels?.download}
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
              {labels?.back}
            </Button>
          </Stack>
        </Grid>
        <Grid item sx={{ mt: { xs: "20px", md: "0" } }} md={4} xs={12}>
          <Stack
            direction={{
              xs: "column",
              md: "row",
            }}
            alignContent="flex-end"
            justifyContent="flex-end"
            spacing={2}
          >
            <Button
              variant="contained"
              sx={{
                display: "inline-block",
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
              {labels?.reset}
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
