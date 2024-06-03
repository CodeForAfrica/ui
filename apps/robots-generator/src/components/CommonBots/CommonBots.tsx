import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import StepperNav from "@/robots-generator/components/StepperNav";
import { useGlobalState } from "@/robots-generator/context/GlobalContext";

interface CommonBotsProps {
  handleNext: (data: any) => void;
  handleBack: () => void;
  lastStep: boolean;
}

export default function CommonBots({
  handleNext,
  handleBack,
  lastStep,
}: CommonBotsProps) {
  const robots = [
    {
      name: "googlebot",
      label: "Googlebot",
      category: "Search Engine",
      allow: true,
    },
    {
      name: "bingbot",
      label: "Bingbot",
      category: "Search Engine",
      allow: true,
    },
    {
      name: "yandexbot",
      label: "Yandexbot",
      category: "Search Engine",
      allow: true,
    },
    {
      name: "baiduspider",
      label: "Baiduspider",
      category: "Search Engine",
      allow: true,
    },
    {
      name: "duckduckbot",
      label: "DuckDuckBot",
      category: "Search Engine",
      allow: true,
    },
    {
      name: "sogou",
      label: "Sogou Spider",
      category: "Search Engine",
      allow: true,
    },
    {
      name: "exabot",
      label: "Exabot",
      category: "Search Engine",
      allow: true,
    },
    {
      name: "gpt-bot",
      label: "GPT Bot",
      category: "AI Bot",
      allow: false,
    },
    {
      name: "googleExtended",
      label: "Google Extended",
      category: "AI Bot",
      allow: false,
    },
    {
      name: "anthropic-ai",
      label: "Anthropic AI",
      category: "AI Bot",
      allow: false,
    },
    {
      name: "openai",
      label: "OpenAI",
      category: "AI Bot",
      allow: false,
    },
    {
      name: "ClaudeBot",
      label: "ClaudeBot",
      category: "AI Bot",
      allow: false,
    },
  ];
  const { state } = useGlobalState();
  const groupedRobots = robots.reduce(
    (acc: { [key: string]: any[] }, robot) => {
      if (!acc[robot.category]) {
        acc[robot.category] = [];
      }
      acc[robot.category].push(robot);
      return acc;
    },
    {},
  );

  const next = () => {
    handleNext({ bots: robots.map((robot) => robot.name) });
  };

  return (
    <>
      <Box sx={{ py: 2 }}>
        {Object.keys(groupedRobots).map((category) => (
          <Accordion key={category} defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              {category}
            </AccordionSummary>
            <AccordionDetails>
              <FormGroup sx={{ width: "100%" }}>
                <Stack
                  direction="row"
                  spacing={1}
                  flexWrap="wrap"
                  alignItems="center"
                  justifyContent="flex-start"
                >
                  {groupedRobots[category].map((robot) => (
                    <FormControlLabel
                      key={robot.name}
                      control={
                        <Checkbox
                          value={robot.name}
                          checked={robot.allow}
                          name={robot.name}
                          sx={{
                            color: "primary.main",
                            "&.Mui-checked": {
                              color: "primary.main",
                            },
                          }}
                        />
                      }
                      label={
                        <Typography>
                          {robot.label}
                          <Tooltip
                            title={`Select if you want to allow ${robot.label} to crawl your website.`}
                          >
                            <IconButton size="small">
                              <InfoIcon />
                            </IconButton>
                          </Tooltip>
                        </Typography>
                      }
                      sx={{
                        width: "fit-content",
                        marginLeft: "0 !important",
                      }}
                    />
                  ))}
                </Stack>
              </FormGroup>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
      <StepperNav
        next={next}
        handleBack={handleBack}
        isValid={true}
        lastStep={lastStep}
        back={false}
      />
    </>
  );
}
