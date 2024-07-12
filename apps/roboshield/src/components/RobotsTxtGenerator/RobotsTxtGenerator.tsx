import { Section } from "@commons-ui/core";
import { Box, Paper, Stack, Step, StepButton, Stepper } from "@mui/material";
import { FC, useEffect } from "react";
import React from "react";
import { useState } from "react";

import Delays from "@/roboshield/components/Delays";
import Sitemaps from "@/roboshield/components/Sitemaps";

import CommonBots from "@/roboshield/components/CommonBots";
import CommonSettings from "@/roboshield/components/CommonSettings";
import ExistingRobotsTxt from "@/roboshield/components/ExistingRobotsTxt";
import Finish from "@/roboshield/components/Finish";
import {
  useGlobalState,
  defaultState,
} from "@/roboshield/context/GlobalContext";
import { generateRobots } from "@/roboshield/lib/robots";
import RichText, { Children } from "@/roboshield/components/RichText";

type Props = { [key: string]: string } & {
  steps: {
    title: string;
    hint?: Children;
    blockType:
      | "existing-robots-txt"
      | "delays"
      | "paths"
      | "block-bots"
      | "site-maps"
      | "finish";
  }[];
  actions: {
    showRobotsTxt: string;
    back: string;
    continue: string;
    copyToClipboard: string;
    download: string;
    fetch: string;
    reset: string;
  };
};

const slugComponentsMap = {
  "existing-robots-txt": ExistingRobotsTxt,
  delays: Delays,
  paths: CommonSettings,
  "block-bots": CommonBots,
  "site-maps": Sitemaps,
  finish: Finish,
};
const RobotsGenerator: FC<Props> = React.forwardRef(
  function RobotsGenerator(props, ref) {
    const { steps, actions } = props;
    const [activeStep, setActiveStep] = useState(0);
    const { state, setState } = useGlobalState();
    const [code, setCode] = useState(state.robots || "");

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
      setActiveStep(props.steps.length - 1);
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

    const activeStepSlug:
      | "existing-robots-txt"
      | "delays"
      | "paths"
      | "block-bots"
      | "site-maps"
      | "finish" = steps[activeStep]?.blockType;
    const ActiveComponent = slugComponentsMap[activeStepSlug] ?? null;
    const { hint, ...activeComponentProps } = steps[activeStep] ?? {};
    return (
      <Section
        sx={{ px: { xs: 2.5, sm: 0 }, py: 10 }}
        ref={ref}
        id="robots-txt-generator"
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
                  {steps?.map((step, index) => (
                    <Step key={step.title}>
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
                        {step?.title}
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
                      hint={<RichText elements={hint} />}
                      handleNext={handleNextStep}
                      handleBack={handleBack}
                      handleSkipToLast={handleSkipToLast}
                      lastStep={activeStep === steps.length - 1}
                      handleReset={handleReset}
                      actions={actions}
                      {...activeComponentProps}
                    />
                  </Paper>
                )}
              </Box>
            </Box>
          </Box>
        </Stack>
      </Section>
    );
  },
);

export default RobotsGenerator;
