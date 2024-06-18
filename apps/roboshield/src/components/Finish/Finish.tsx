import { Box, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";

import Code from "../Code";
import StepperNav from "../StepperNav";

import { useGlobalState } from "@/roboshield/context/GlobalContext";
import { generateRobots } from "@/roboshield/lib/robots";
import { downloadFile } from "@/roboshield/utils/file";

interface FinishProps {
  handleNext: (data: any) => void;
  handleBack: () => void;
  handleReset: () => void;
  lastStep: boolean;
}

export default function Finish({ handleReset, handleBack }: FinishProps) {
  const { state } = useGlobalState();
  const [code, setCode] = useState(state.robots || "");
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [saved, setSaved] = useState(false);

  async function saveData() {
    await fetch("/api/save_robots", {
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
          alignSelf: "flex-start",
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
      <StepperNav
        next={() => {}}
        handleBack={handleBack}
        isValid={true}
        lastStep={true}
        back={false}
      />
      <Snackbar
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={() => setShowSnackbar(false)}
        message="Copied to clipboard"
      />
    </>
  );
}
