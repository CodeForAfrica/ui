import { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Section } from "@commons-ui/core";
import Stack from "@mui/material/Stack";
import ExistingRobots from "@/robots-generator/components/ExistingRobots";
import CommonSettings from "@/robots-generator/components/CommonSettings";
import PlatformSettings from "@/robots-generator/components/PlatformSettings";
import CommonBots from "@/robots-generator/components/CommonBots";
import Code from "@/robots-generator/components/Code";
import {
  useGlobalState,
  defaultState,
} from "@/robots-generator/context/GlobalContext";
import Finish from "@/robots-generator/components/Finish";
import { generateRobots } from "@/robots-generator/lib/robots";
import { useEffect } from "react";
import { downloadFile } from "../utils/file";
import { Snackbar } from "@mui/material";
import Hero from "../components/Hero";

interface Step {
  label: string;
  description: string;
  component: React.FC<any>;
}

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const { state, setState } = useGlobalState();
  const [code, setCode] = useState(state.robots || "");
  const [showSnackbar, setShowSnackbar] = useState(false);

  const steps: Step[] = [
    {
      label: "Fetch existing robots",
      description: `Start by fetching the robots.txt file of the website you want to generate robots for.`,
      component: ExistingRobots,
    },
    {
      label: "Common Settings",
      description:
        "You can set common settings for the robots you want to generate. These settings will be applied to all robots.",
      component: CommonSettings,
    },
    {
      label: "Platform Specific Settings",
      description: `You can set platform specific settings for the robots you want to generate.`,
      component: PlatformSettings,
    },
    {
      label: "Block AI Bots",
      description: `Select AI bots you want to block from crawling your website.`,
      component: CommonBots,
    },
    {
      label: "Finish",
      description: `Your robots.txt file has been generated successfully. You can now copy the code or download the file in the next step.`,
      component: Finish,
    },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setState(defaultState);
    setActiveStep(0);
  };

  const handleNextStep = (data: any) => {
    const newState = { ...state, ...data };
    setState(newState);
    handleNext();
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
      <Hero />
      <Section sx={{ px: { xs: 2.5, sm: 0 }, py: 10 }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                sx={{
                  "& .MuiStepLabel-label": {
                    color:
                      index === activeStep ? "primary.main" : "secondary.main",
                  },
                  fontSize: {
                    xs: "1rem",
                    md: "1.2rem",
                  },
                  fontWeight: { xs: 500, md: 600 },
                }}
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography
                  sx={{
                    mb: 2,
                    fontSize: {
                      xs: "0.875rem",
                      md: "1rem",
                    },
                  }}
                >
                  {step.description}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <step.component
                    handleNext={handleNextStep}
                    handleBack={handleBack}
                    lastStep={index === steps.length - 1}
                  />
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>
              Your robots.txt file has been generated successfully. You can now
              copy the code or download the file.
            </Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Restart
            </Button>
          </Paper>
        )}
      </Section>
    </>
  );
}

export async function getStaticProps() {
  return {
    props: {
      navbar: {
        logo: {
          alt: "CfA logo",
          prefix: "media",
          filename: "cfa-logo.svg",
          mimeType: "image/svg+xml",
          filesize: 6029,
          width: 136,
          height: 61,
          url: "https://cfa.dev.codeforafrica.org/media/cfa-logo.svg",
          src: "https://cfa.dev.codeforafrica.org/media/cfa-logo.svg",
        },
        menus: [
          { label: "HOME", href: "/" },
          { label: "FAQ", href: "#" },
          { label: "ABOUT", href: "#" },
        ],
        socialLinks: [
          {
            platform: "Github",
            url: "https://github.com/CodeForAfrica",
            id: "1",
          },
        ],
      },
    },
  };
}
