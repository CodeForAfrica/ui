import { Section } from "@commons-ui/core";
import {
  IconButton,
  Alert,
  Box,
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

import Delays from "@/roboshield/components/Delays";
import Hero from "@/roboshield/components/Hero";
import Sitemaps from "@/roboshield/components/Sitemaps";

import CommonBots from "@/roboshield/components/CommonBots";
import CommonSettings from "@/roboshield/components/CommonSettings";
import ExistingRobots from "@/roboshield/components/ExistingRobots";
import Finish from "@/roboshield/components/Finish";
import {
  useGlobalState,
  defaultState,
} from "@/roboshield/context/GlobalContext";
import { generateRobots } from "@/roboshield/lib/robots";
import { getPageServerSideProps } from "@/roboshield/lib/data";

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

  const handleSkipToLast = (data: any) => {
    const newState = { ...state, ...data };
    setState(newState);
    setActiveStep(steps.length - 1);
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
                    px: { xs: 2, md: 0 },
                    py: "10px",
                    mb: 5,
                  }}
                ></Box>

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
                    <ActiveComponent
                      hint={steps[activeStep].description}
                      handleNext={handleNextStep}
                      handleBack={handleBack}
                      handleSkipToLast={handleSkipToLast}
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

export async function getServerSideProps(context: any) {
  const { props } = await getPageServerSideProps(context);
  return {
    props: {
      ...props,
      footer: {
        logo: props?.footer?.logo,
        newsletter: props?.footer?.newsletter,
        description: `This site is an <a href="https://github.com/CodeForAfrica/ui/tree/main/apps/roboshield">open source code</a> built by <a href="https://codeforafrica.org">Code for Africa</a>, the continent's largest network of civic technology and data journalism labs. All content is released under a <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons 4 Attribution</a> License. Reuse it to help empower your own community.`,
        connect: props?.footer?.connect,
        partners: [
          {
            name: "DW Africa",
            url: "https://www.dw.com/africa",
            logo: {
              alt: "DW Africa",
              prefix: "media",
              filename: "dw-africa.png",
              sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
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
              sizes: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
              url: "/images/civic-signal.png",
              src: "/images/civic-signal.png",
            },
          },
        ],
        project: `This project was inspired by a
                  <a href="https://reutersinstitute.politics.ox.ac.uk/how-many-news-websites-block-ai-crawlers" rel="noreferrer noopener" target="blank">survey conducted</a>
                  by the Reutures Instititue in the Minority World. The Audit data used
                  in this project was based on
                  <a href="https://civicsignal.africa" rel="noreferrer noopener" target="blank">CivicSignal</a>
                  MediaData database.
                  `,
      },
    },
  };
}
