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

const steps = [
  {
    label: "Fetch existing robots",
    description: `Start by fetching the robots.txt file of the website you want to generate robots for.`,
    component: ExistingRobots,
    stepValid: false,
  },
  {
    label: "Common Settings",
    description:
      "You can set common settings for the robots you want to generate.",
    component: CommonSettings,
    stepValid: true,
  },
  {
    label: "Platform Specific Settings",
    description: `You can set platform specific settings for the robots you want to generate.`,
    component: PlatformSettings,
    stepValid: true,
  },
  {
    label: "Common Bots",
    description: `You can set the allow status for common bots.`,
    component: CommonBots,
    stepValid: true,
  },
  {
    label: "Download",
    description: `You can download the robots you have generated.`,
    component: () => null,
    stepValid: true,
  },
];

const code = `
User-agent: *
Disallow: /search
Allow: /search/about
Allow: /search/static

User-agent: Googlebot
Disallow: /private
Allow: /public

User-agent: Bingbot
Disallow: /private

User-agent: GPT Bot
Disallow: /

User-agent: Anthropic AI
Disallow: /
`;

export default function Home() {
  const [stepsState, setSteps] = useState(steps);
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleStepValid = (isValid: boolean) => {
    const newSteps = stepsState.map((step, index) => {
      if (index === activeStep) {
        return { ...step, stepValid: isValid };
      }
      return step;
    });
    setSteps(newSteps);
  };

  return (
    <Section sx={{ px: { xs: 2.5, sm: 0 } }}>
      <Stack direction="row" justifyContent="space-between" height="100%">
        <Box sx={{ p: 3, width: "60%" }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {stepsState.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  sx={{
                    "& .MuiStepLabel-label": {
                      color:
                        index === activeStep
                          ? "primary.main"
                          : "secondary.main",
                    },
                  }}
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  <Box sx={{ mb: 2 }}>
                    <step.component onStepValid={handleStepValid} />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                        disabled={!step.stepValid}
                      >
                        {index === steps.length - 1 ? "Finish" : "Continue"}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length && (
            <Paper square elevation={0} sx={{ p: 3 }}>
              <Typography>
                Your robots.txt file has been generated successfully. You can
                now copy the code or download the file.
              </Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Restart
              </Button>
            </Paper>
          )}
        </Box>
        <Box
          sx={{
            py: 3,
            width: "40%",
            position: "sticky",
            top: "100px",
            alignSelf: "flex-start",
            overflowY: "auto",
          }}
        >
          <Code
            code={code}
            onCopy={() => {}}
            onDownload={() => {}}
            onReset={() => {}}
            showButtons={activeStep === steps.length}
          />
        </Box>
      </Stack>
    </Section>
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
        menus: [],
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
