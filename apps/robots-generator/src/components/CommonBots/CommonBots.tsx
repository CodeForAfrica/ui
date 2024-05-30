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
export default function CommonBots() {
  const robots = [
    {
      name: "googlebot",
      label: "Googlebot",
      category: "Search Engine",
    },
    {
      name: "bingbot",
      label: "Bingbot",
      category: "Search Engine",
    },
    {
      name: "yandexbot",
      label: "Yandexbot",
      category: "Search Engine",
    },
    {
      name: "baiduspider",
      label: "Baiduspider",
      category: "Search Engine",
    },
    {
      name: "duckduckbot",
      label: "DuckDuckBot",
      category: "Search Engine",
    },
    {
      name: "gpt-bot",
      label: "GPT Bot",
      category: "AI Bot",
    },
    {
      name: "googleExtended",
      label: "Google Extended",
      category: "AI Bot",
    },
    {
      name: "anthropic-ai",
      label: "Anthropic AI",
      category: "AI Bot",
    },
    {
      name: "openai",
      label: "OpenAI",
      category: "AI Bot",
    },
    {
      name: "ClaudeBot",
      label: "ClaudeBot",
      category: "AI Bot",
    },
  ];

  // group by category
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

  return (
    <Box>
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
                        sx={{
                          color: "primary.main",
                          "&.Mui-checked": {
                            color: "primary.main",
                          },
                        }}
                      />
                    }
                    label={<Typography>{robot.label}</Typography>}
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
  );
}
