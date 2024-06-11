import { useGlobalState } from "@/robots-generator/context/GlobalContext";
import { Box, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import Code from "../Code";
import { downloadFile } from "@/robots-generator/utils/file";
import { generateRobots } from "@/robots-generator/lib/robots";

interface FinishProps {
  handleNext: (data: any) => void;
  handleBack: () => void;
  handleReset: () => void;
  lastStep: boolean;
}

export default function Finish({ handleReset }: FinishProps) {
  const { state } = useGlobalState();
  const [code, setCode] = useState(state.robots || "");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [saved, setSaved] = useState(false);

  async function saveData() {
    await fetch("/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: state }),
    });
  }

  const getCopyMetadata = () => {
    const date = new Date().toISOString();
    const url = window.location.href;
    return `${code}\n\n\n# Generated on: ${date}\n# URL: ${url}\n\n`;
  };

  const handleDownload = async () => {
    const filename = "robots.txt";
    if (!saved) {
      await saveData();
      setSaved(true);
    }
    await downloadFile(filename, getCopyMetadata());
  };

  const handleCopy = async () => {
    if (!saved) {
      await saveData();
      setSaved(true);
    }
    navigator.clipboard.writeText(getCopyMetadata());
    setShowSnackbar(true);
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  useEffect(() => {
    const generateRobotsFile = async () => {
      const robots = await generateRobots(state);
      setCode(robots);
    };

    generateRobotsFile();
  }, [state]);

  return (
    <>
      <Box
        sx={{
          py: 3,
          width: "100%",
          position: "sticky",
          top: "100px",
          alignSelf: "flex-start",
          overflowY: "auto",
        }}
      >
        <Code
          code={code}
          onCopy={handleCopy}
          onDownload={handleDownload}
          onReset={handleReset}
          showButtons={true}
          onCodeChange={handleCodeChange}
        />
      </Box>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={() => setShowSnackbar(false)}
        message="Copied to clipboard"
      />
    </>
  );
}
