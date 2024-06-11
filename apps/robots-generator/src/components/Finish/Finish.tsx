import StepperNav from "@/robots-generator/components/StepperNav";
import { useGlobalState } from "@/robots-generator/context/GlobalContext";
import { Box } from "@mui/material";
import { useState } from "react";
import Code from "../Code";
import { downloadFile } from "@/robots-generator/utils/file";

interface FinishProps {
  handleNext: (data: any) => void;
  handleBack: () => void;
  lastStep: boolean;
}

export default function Finish({
  handleNext,
  handleBack,
  lastStep,
}: FinishProps) {
  const { state } = useGlobalState();
  const [code, setCode] = useState(state.robots || "");

  async function saveData() {
    await fetch("/api/save", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data: state }),
    });
  }

  const next = async () => {
    await saveData();
    handleNext({});
  };

  const getCopyMetadata = () => {
    const date = new Date().toISOString();
    const url = window.location.href;
    return `${code}\n\n\n# Generated on: ${date}\n# URL: ${url}\n\n`;
  };

  const handleDownload = async () => {
    const filename = "robots.txt";
    await downloadFile(filename, getCopyMetadata());
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getCopyMetadata());
    // setShowSnackbar(true);
  };

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

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
          onReset={() => setCode(state.robots || "")}
          showButtons={true}
          onCodeChange={handleCodeChange}
        />
      </Box>
      {/* <StepperNav
        next={next}
        handleBack={handleBack}
        isValid={true}
        lastStep={lastStep}
        back={false}
      /> */}
    </>
  );
}
