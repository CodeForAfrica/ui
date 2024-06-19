import { Section } from "@commons-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import CodeIcon from "@mui/icons-material/Code";
import {
  IconButton,
  Alert,
  Box,
  Dialog,
  DialogContent,
  Paper,
  Stack,
  Step,
  StepButton,
  Stepper,
  Tooltip,
} from "@mui/material";
import { useEffect } from "react";
import React from "react";
import { useRef, useState } from "react";

import CodeEditor from "../components/Code/CodeEditor";
import Delays from "../components/Delays";
import Hero from "../components/Hero";
import Sitemaps from "../components/Sitemaps";

import CommonBots from "@/roboshield/components/CommonBots";
import CommonSettings from "@/roboshield/components/CommonSettings";
import ExistingRobots from "@/roboshield/components/ExistingRobots";
import Finish from "@/roboshield/components/Finish";
import {
  useGlobalState,
  defaultState,
} from "@/roboshield/context/GlobalContext";
import { generateRobots } from "@/roboshield/lib/robots";

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
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
      label: "Block Bots",
      description: `Select bots you want to block from crawling your website.`,
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

  const handleStep = (step: number) => () => {
    setActiveStep(step);
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
                  paddingBottom: 8,
                  paddingTop: 4,
                  background: "#FFFFFF",
                  borderRadius: 2,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    px: { xs: 2, md: 0 },
                    mb: 5,
                  }}
                >
                  <Tooltip title="View current robots.txt file">
                    <IconButton
                      onClick={handleClickOpen}
                      sx={{
                        background: "#1120E1",
                        color: "#FFFFFF",
                        border: "1px solid #1120E1",
                        "&:hover": {
                          color: "#1120E1",
                        },
                      }}
                    >
                      <CodeIcon />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Stepper nonLinear activeStep={activeStep}>
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepButton
                        color="inherit"
                        onClick={handleStep(index)}
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
                      </StepButton>
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
                    <Alert
                      severity="info"
                      sx={{
                        alignItems: "center",
                        fontSize: {
                          xs: "0.8rem",
                          md: "1rem",
                        },
                      }}
                    >
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

          <Dialog
            open={open}
            onClose={handleClose}
            fullWidth={true}
            maxWidth="md"
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row-reverse",
                  mb: 2,
                }}
              >
                <Tooltip title="Exit preview">
                  <IconButton
                    onClick={handleClose}
                    sx={{
                      background: "#1120E1",
                      color: "#FFFFFF",
                      border: "1px solid #1120E1",
                      "&:hover": {
                        color: "#1120E1",
                      },
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                </Tooltip>
              </Box>

              <CodeEditor code={code} setCode={() => {}} readOnly={true} />
            </DialogContent>
          </Dialog>
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
        menus: [{ label: "ABOUT", href: "#" }],
        socialLinks: [
          {
            platform: "Github",
            url: "https://github.com/CodeForAfrica/ui",
            id: "1",
          },
        ],
      },
      footer: {
        logo: {
          alt: "CfA logo",
          prefix: "media",
          filename: "cfalogobw.svg",
          mimeType: "image/svg+xml",
          url: "https://cfa.dev.codeforafrica.org/media/cfalogobw.svg",
          src: "https://cfa.dev.codeforafrica.org/media/cfalogobw.svg",
        },
        description:
          "This site is an open source code built by Code for Africa, the continent's largest network of civic technology and data journalism labs. All content is released under a Creative Commons 4 Attribution License. Reuse it to help empower your own community.",
        partners: [
          {
            name: "DW Africa",
            url: "https://www.dw.com/africa",
            logo: {
              alt: "DW Africa",
              prefix: "media",
              filename: "dw-africa.png",
              mimeType: "image/png",
              url: "/images/DW.png",
              src: "/images/DW.png",
            },
          },
          {
            name: "Civic Signal",
            url: "https://civicsignal.africa/",
            logo: {
              alt: "Civic Signal",
              prefix: "media",
              filename: "civic-signal.png",
              mimeType: "image/png",
              url: "/images/civic-signal.png",
              src: "/images/civic-signal.png",
            },
          },
        ],
      },
    },
  };
}
