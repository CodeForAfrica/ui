import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack,
  Typography,
  Switch,
  Grid,
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useCallback, useState } from "react";
import { useMemo, memo } from "react";

import StepperNav from "@/roboshield/components/StepperNav";
import { useGlobalState } from "@/roboshield/context/GlobalContext";
import {
  Robot,
  getBotType,
  groupAndSortRobots,
} from "@/roboshield/lib/robots-data";
import { StepComponent } from "@/roboshield/types/stepComponent";
import SkipToLastStep from "@/roboshield/components/SkipToLastStep";
import StepHint from "@/roboshield/components/StepHint";

export default function CommonBots({
  handleNext,
  handleBack,
  handleSkipToLast,
  hint,
  lastStep,
}: StepComponent) {
  const { state } = useGlobalState();

  const [selectedBots, setSelectedBots] = useState(state.bots);

  const MemoizedFormControlLabel = memo(FormControlLabel);
  const robotsGroupedByType = useMemo(
    () => Object.entries(groupAndSortRobots()),
    [],
  );

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

  const skipToLast = () => {
    handleSkipToLast({ bots: selectedBots });
  };

  return (
    <>
      <SkipToLastStep handleSkipToLast={skipToLast} lastStep={lastStep} />
      <StepHint hint={hint} />
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
              width="100%"
            >
              {robotsGroupedByType.map(([type, robots]) => (
                <Accordion
                  key={type}
                  elevation={0}
                  sx={{
                    width: "100%",
                    marginLeft: "0 !important",
                    "&.MuiPaper-elevation": {
                      position: "unset",
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    sx={{
                      background: "#E9EEFB",
                      border: "1px solid #D6DFF8",
                      "&.MuiAccordionSummary-root .MuiAccordionSummary-content":
                        {
                          justifyContent: "space-between",
                          flexWrap: "wrap",
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
                  <AccordionDetails
                    sx={{
                      border: "1px solid #D6DFF8",
                      borderTop: "0",
                    }}
                  >
                    <Grid container spacing={2}>
                      {robots.map((robot) => (
                        <Grid item xs={12} md={4} key={robot.name}>
                          <MemoizedFormControlLabel
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
                              marginLeft: "0 !important",
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
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
