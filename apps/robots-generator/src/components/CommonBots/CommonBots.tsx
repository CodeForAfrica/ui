import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Typography,
  Switch,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import StepperNav from "@/robots-generator/components/StepperNav";
import { useGlobalState } from "@/robots-generator/context/GlobalContext";
import { useCallback, useState } from "react";
import {
  Robot,
  getBotType,
  groupedRobots,
} from "@/robots-generator/lib/robots-data";
import { useMemo, memo } from "react";

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
  const { state } = useGlobalState();

  const [selectedBots, setSelectedBots] = useState(state.bots);

  const MemoizedFormControlLabel = memo(FormControlLabel);
  const robotsGroupedByType = useMemo(() => Object.entries(groupedRobots), []);

  const isSelected = (robot: Robot) => {
    return selectedBots.find((bot) => bot.name === robot.name)?.allow;
  };

  const toggleBot = useCallback((robot: Robot) => {
    setSelectedBots((prev) =>
      prev.map((bot) =>
        bot.name === robot.name ? { ...bot, allow: !bot.allow } : bot,
      ),
    );
  }, []);

  const bulkToggle = useCallback((robots: Robot[], allow: boolean) => {
    const robotNames = new Set(robots.map((robot) => robot.name));

    setSelectedBots((prev) =>
      prev.map((bot) =>
        robotNames.has(bot.name) ? { ...bot, allow: !allow } : bot,
      ),
    );
  }, []);

  const isSwitchChecked = (robots: Robot[]) => {
    return robots.every((robot) => !isSelected(robot));
  };

  const next = () => {
    handleNext({ bots: selectedBots });
  };

  return (
    <>
      <Box sx={{ py: 2 }}>
        {
          <FormGroup sx={{ width: "100%" }}>
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              alignItems="center"
              justifyContent="flex-start"
              gap={1}
            >
              {robotsGroupedByType.map(([type, robots]) => (
                <Accordion
                  key={type}
                  sx={{ width: "100%", marginLeft: "0 !important" }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                      "&.MuiAccordionSummary-root .MuiAccordionSummary-content":
                        {
                          justifyContent: "space-between",
                        },
                    }}
                  >
                    <Typography
                      sx={{
                        whiteSpace: "nowrap",
                      }}
                    >
                      {type}
                      <Tooltip title={`${getBotType(type).blockReason}`}>
                        <IconButton
                          size="small"
                          color={
                            getBotType(type).shouldBlock ? "error" : "info"
                          }
                        >
                          {getBotType(type).shouldBlock ? (
                            <WarningIcon />
                          ) : (
                            <InfoIcon />
                          )}
                        </IconButton>
                      </Tooltip>
                    </Typography>
                    <MemoizedFormControlLabel
                      control={
                        <Switch
                          checked={isSwitchChecked(robots)}
                          onChange={(e) => {
                            e.stopPropagation();
                            bulkToggle(robots, e.target.checked);
                          }}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label={<Typography>Block all</Typography>}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </AccordionSummary>
                  <AccordionDetails>
                    <Stack
                      direction="row"
                      spacing={1}
                      flexWrap="wrap"
                      alignItems="center"
                      justifyContent="space-between"
                      gap={1}
                    >
                      {robots.map((robot) => (
                        <MemoizedFormControlLabel
                          key={robot.name}
                          control={
                            <Checkbox
                              value={robot.name}
                              checked={!isSelected(robot)}
                              name={robot.name}
                              onChange={() => toggleBot(robot)}
                              sx={{
                                color: "primary.main",
                                "&.Mui-checked": {
                                  color: "primary.main",
                                },
                              }}
                            />
                          }
                          label={
                            <Typography
                              sx={{
                                whiteSpace: "nowrap",
                              }}
                            >
                              {robot.name}
                              <Tooltip title={robot.about}>
                                <IconButton size="small" color="info">
                                  <InfoIcon />
                                </IconButton>
                              </Tooltip>
                            </Typography>
                          }
                          sx={{
                            width: "20%",
                            marginLeft: "0 !important",
                          }}
                        />
                      ))}
                    </Stack>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Stack>
          </FormGroup>
        }
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
