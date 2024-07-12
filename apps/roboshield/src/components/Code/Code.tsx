import { Box, Button, Grid, Stack, SvgIcon } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CopyIcon from "@/roboshield/assets/icons/Type=copy, Size=24, Color=CurrentColor.svg";
import SaveIcon from "@/roboshield/assets/icons/Type=save, Size=24, Color=CurrentColor.svg";
import BackIcon from "@/roboshield/assets/icons/Type=back, Size=24, Color=CurrentColor.svg";
import ResetIcon from "@/roboshield/assets/icons/Type=reset, Size=24, Color=CurrentColor.svg";

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
  const theme = useTheme();

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
              sx={{
                mt: 2,
                "&:hover .MuiSvgIcon-root path": {
                  stroke: theme.palette.primary.main,
                },
              }}
              startIcon={
                <SvgIcon
                  component={CopyIcon}
                  sx={{
                    fill: "transparent",
                  }}
                />
              }
              onClick={onCopy}
              disabled={!showButtons}
            >
              {labels?.copyToClipboard}
            </Button>
            <Button
              variant="contained"
              startIcon={
                <SvgIcon
                  component={SaveIcon}
                  sx={{
                    fill: "transparent",
                  }}
                />
              }
              sx={{
                mt: 2,
                background: "#000000",
                border: "1px solid #000000",
                "&:hover": {
                  background: "none",
                  color: "#000000",
                },
                "&:hover .MuiSvgIcon-root path": {
                  stroke: theme.palette.text.primary,
                },
              }}
              onClick={onDownload}
              disabled={!showButtons}
            >
              {labels?.download}
            </Button>
            <Button
              variant="outlined"
              startIcon={
                <SvgIcon
                  component={BackIcon}
                  sx={{
                    stroke: "red",
                    fill: "white",
                    color: "red",
                    transition: "stroke 0.3s, fill 0.3s",
                  }}
                />
              }
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
              startIcon={
                <SvgIcon
                  component={ResetIcon}
                  sx={{
                    fill: "transparent",
                  }}
                />
              }
              sx={{
                mt: 2,
                background: theme.palette.error.main,
                border: `1px solid ${theme.palette.error.main}`,
                "&:hover": {
                  background: "none",
                  color: theme.palette.error.main,
                },
                "&:hover .MuiSvgIcon-root path": {
                  stroke: theme.palette.error.main,
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
