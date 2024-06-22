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
            platform: "Twitter",
            url: "https://twitter.com/Code4Africa",
            id: "651e88dbc938b817cab85671",
          },
        ],
      },
      footer: {
        logo: {
          alt: "CfA logo",
          prefix: "media",
          filename: "cfalogobw.svg",
          priority: "true",
          url: "https://cfa.dev.codeforafrica.org/media/cfalogobw.svg",
          src: "https://cfa.dev.codeforafrica.org/media/cfalogobw.svg",
        },
        description: `This site is an <a href="https://github.com/CodeForAfrica/ui/tree/main/apps/roboshield">open source code</a> built by <a href="https://codeforafrica.org">Code for Africa</a>, the continent's largest network of civic technology and data journalism labs. All content is released under a <a href="https://creativecommons.org/licenses/by/4.0/">Creative Commons 4 Attribution</a> License. Reuse it to help empower your own community.`,
        connect: {
          title: "STAY IN TOUCH:",
          links: [
            {
              platform: "Twitter",
              url: "https://twitter.com/Code4Africa",
              id: "651e88dbc938b817cab85671",
            },
            {
              platform: "Slack",
              url: "https://code4africa.slack.com/",
              id: "651e8995c938b817cab85672",
            },
            {
              platform: "Linkedin",
              url: "https://www.linkedin.com/company/code-for-africa/",
              id: "651e89a5c938b817cab85673",
            },
            {
              platform: "Facebook",
              url: "https://www.facebook.com/CodeForAfrica/",
              id: "651e89afc938b817cab85674",
            },
            {
              platform: "Instagram",
              url: "https://www.instagram.com/code4africa__/",
              id: "651e89c3c938b817cab85675",
            },

            {
              platform: "Github",
              url: "https://github.com/CodeForAfrica",
              id: "651e89dec938b817cab85676",
            },
          ],
        },
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
        newsletter: {
          title: "Subscribe to our Newsletter",
          embedCode:
            '<!-- Begin Mailchimp Signup Form -->\n\n<div id="mc_embed_signup">\n <form action="https://twitter.us6.list-manage.com/subscribe/post?u=65e5825507b3cec760f272e79&amp;id=c2ff751541" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>\n <div id="mc_embed_signup_scroll">\n <label for="MERGE1">Name</label>\n <input type="text" name="MERGE1" id="MERGE1" size="25" value="" placeholder="Your name">\n <label for="mce-EMAIL">Email</label>\n <input type="email" value="" placeholder="example@email.com" name="EMAIL" class="email" id="mce-EMAIL" required>\n <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->\n <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_65e5825507b3cec760f272e79_c2ff751541" tabindex="-1" value=""></div>\n <div class="clear"><input type="submit" value="Sign up" id="mc-embedded-subscribe" class="button"></div>\n </div>\n </form>\n</div>\n\n<!--End mc_embed_signup-->',
        },
      },
    },
  };
}
