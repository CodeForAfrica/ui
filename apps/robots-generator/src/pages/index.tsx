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
    description: `You can fetch existing robots by entering the URL of the website you want to fetch robots from.`,
    component: ExistingRobots,
  },
  {
    label: "Common Settings",
    description:
      "You can set common settings for the robots you want to generate.",
    component: CommonSettings,
  },
  {
    label: "Platfrom Specific Settings",
    description: `You can set platform specific settings for the robots you want to generate.`,
    component: PlatformSettings,
  },
  {
    label: "Common Bots",
    description: `You can set common bots for the robots you want to generate.`,
    component: CommonBots,
  },
  {
    label: "Review & Edit",
    description: `You can review and edit the robots you have generated.`,
    component: () => <Typography>Review & Edit</Typography>,
  },
  {
    label: "Generate Robots",
    description: `You can generate robots by clicking the button below.`,
    component: () => <Typography>Generate Robots</Typography>,
  },
];

export default function Home() {
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

  return (
    <Section sx={{ px: { xs: 2.5, sm: 0 } }}>
      <Stack direction="row" justifyContent="space-between" height="100%">
        <Box sx={{ p: 3, width: "60%" }}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    index === 2 ? (
                      <Typography variant="caption">Last step</Typography>
                    ) : null
                  }
                >
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                  <Box sx={{ mb: 2 }}>
                    <step.component />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                        // disabled={!isValid}
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
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Reset
              </Button>
            </Paper>
          )}
        </Box>
        <Box sx={{ py: 3, width: "40%" }}>
          <Code />
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
        menus: [
          // {
          //   label: "Our Work",
          //   href: "/",
          // },
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
