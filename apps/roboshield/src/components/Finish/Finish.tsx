import { Box, Snackbar } from "@mui/material";
import { sendGAEvent } from "@next/third-parties/google";
import { useEffect, useState } from "react";

import Code from "@/roboshield/components/Code";
import StepperNav from "@/roboshield/components/StepperNav";

import SkipToLastStep from "@/roboshield/components/SkipToLastStep";
import StepHint from "@/roboshield/components/StepHint";
import { useGlobalState } from "@/roboshield/context/GlobalContext";
import { generateRobots } from "@/roboshield/lib/robots";
import { StepComponent } from "@/roboshield/types/stepComponent";
import { downloadFile } from "@/roboshield/utils/file";

interface Props extends StepComponent {
  handleReset: () => void;
  placeholder?: string;
}
export default function Finish({
  handleReset,
  handleBack,
  hint,
  lastStep,
  actions,
}: Props) {
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

  const reportShieldEvent = (event: string) => {
    const value = new Date().toISOString();
    sendGAEvent("event", event, { value });
  };

  const handleDownload = async () => {
    reportShieldEvent("download");
    const filename = "robots.txt";
    if (!saved) {
      await saveData();
      setSaved(true);
    }
    await downloadFile(filename, code);
  };

  const handleCopy = async () => {
    reportShieldEvent("copy");
    if (!saved) {
      await saveData();
      setSaved(true);
    }
    navigator.clipboard.writeText(code);
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
      <SkipToLastStep
        handleSkipToLast={() => {}}
        lastStep={lastStep}
        showRobotsTxt={actions?.showRobotsTxt}
      />
      <StepHint hint={hint} />
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
          onBack={handleBack}
          showButtons={true}
          onCodeChange={handleCodeChange}
          labels={actions}
        />
      </Box>
      <StepperNav
        next={() => {}}
        handleBack={handleBack}
        isValid={true}
        lastStep={true}
        back={false}
        labels={actions}
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
