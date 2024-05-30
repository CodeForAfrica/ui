import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
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
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              alignItems="center"
            >
              <FormGroup sx={{ width: "100%", bgcolor: "red" }}>
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
                          bgcolor: "blue",
                        }}
                      />
                    }
                    label={robot.label}
                    sx={{
                      margin: 0,
                      "&.MuiTypography-root": {
                        marginTop: 0,
                      },
                      bgcolor: "green",
                    }}
                  />
                ))}
              </FormGroup>
            </Stack>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
