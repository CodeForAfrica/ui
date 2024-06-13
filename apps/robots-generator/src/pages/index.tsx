import { useRef, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { Section } from "@commons-ui/core";
import Stack from "@mui/material/Stack";
import ExistingRobots from "@/robots-generator/components/ExistingRobots";
import CommonSettings from "@/robots-generator/components/CommonSettings";
import CommonBots from "@/robots-generator/components/CommonBots";
import {
  useGlobalState,
  defaultState,
} from "@/robots-generator/context/GlobalContext";
import Finish from "@/robots-generator/components/Finish";
import { generateRobots } from "@/robots-generator/lib/robots";
import { useEffect } from "react";
import React from "react";
import Sitemaps from "../components/Sitemaps";
import Delays from "../components/Delays";
import Hero from "../components/Hero";
import Grid from "@mui/material/Grid";
import Alert from "@mui/material/Alert";

interface Step {
  label: string;
  description: string;
  component: React.FC<any>;
}

export default function Home() {
  const [activeStep, setActiveStep] = useState(0);
  const { state, setState } = useGlobalState();
  const [code, setCode] = useState(state.robots || "");
  const scrolRef = useRef<HTMLDivElement | null>(null);

  const steps: Step[] = [
    {
      label: "Existing robots",
      description: `Start by fetching the robots.txt file of the website you want to generate robots for.`,
      component: ExistingRobots,
    },
    {
      label: "Delays",
      description: `You can set bot delays for the robots you want to generate.`,
      component: Delays,
    },
    {
      label: "Paths",
      description:
        "You can set disallowed and allowed paths for the robots you want to generate. All paths should be relative to the root of your site and end with a /",
      component: CommonSettings,
    },
    {
      label: "Block AI Bots",
      description: `Select AI bots you want to block from crawling your website.`,
      component: CommonBots,
    },
    {
      label: "Site Maps",
      description: `You can add sitemap URLs to your robots.txt file.`,
      component: Sitemaps,
    },
    {
      label: "Finish",
      description: `Your robots.txt file has been generated successfully. You can now copy the code or download the file.`,
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

  useEffect(() => {
    const generateRobotsFile = async () => {
      const robots = await generateRobots(state);
      setCode(robots);
    };

    generateRobotsFile();
  }, [state]);

  const ActiveComponent = steps[activeStep]?.component ?? null;

  return (
    <>
      <Hero scrolRef={scrolRef} />
      <Section
        sx={{ px: { xs: 2.5, sm: 0 }, py: 10 }}
        ref={scrolRef}
        id="robots-generator"
      >
        <Stack
          direction={{
            xs: "column",
            md: "row",
          }}
          justifyContent="space-between"
          height="100%"
        >
          <Box
            sx={{
              p: 1,
              width: "100%",
              background:
                "linear-gradient(180deg, rgba(243, 246, 253, 0.7) 0%, rgba(243, 246, 253, 0) 86.26%);",
              borderRadius: 2,
              my: 0,
            }}
          >
            <Box
              sx={{
                width: "100%",
                border: "1px solid rgb(19 81 216 / 10%);",
                p: { md: 6 },
                borderRadius: 2,
                background:
                  "linear-gradient(0deg, rgba(19, 81, 216, 0.01), rgba(19, 81, 216, 0.01)), linear-gradient(0deg, rgba(19, 81, 216, 0.05), rgba(19, 81, 216, 0.05));",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  px: { md: 6 },
                  py: 8,
                  background: "#FFFFFF",
                  borderRadius: 2,
                }}
              >
                <Stepper activeStep={activeStep}>
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel
                        sx={{
                          "& .MuiStepLabel-label": {
                            color:
                              index === activeStep
                                ? "primary.main"
                                : "secondary.main",
                            display: { xs: "none", md: "block" },
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
                    </Step>
                  ))}
                </Stepper>
                {ActiveComponent && (
                  <Paper
                    sx={{
                      p: 3,
                      mt: 3,
                      boxShadow: 0,
                    }}
                  >
                    <Alert severity="info">
                      {steps[activeStep].description}
                    </Alert>
                    <ActiveComponent
                      handleNext={handleNextStep}
                      handleBack={handleBack}
                      lastStep={activeStep === steps.length - 1}
                      handleReset={handleReset}
                    />
                  </Paper>
                )}
              </Box>
            </Box>
          </Box>
        </Stack>
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
