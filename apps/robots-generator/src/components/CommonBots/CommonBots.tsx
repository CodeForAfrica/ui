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
import { Robot, robots } from "@/robots-generator/lib/robots";
import { useState } from "react";

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

  const isSelected = (robot: Robot) => {
    return selectedBots.find((bot) => bot.name === robot.name)?.allow;
  };

  const toggleBot = (robot: Robot) => {
    setSelectedBots((prev) =>
      prev.map((bot) =>
        bot.name === robot.name ? { ...bot, allow: !bot.allow } : bot,
      ),
    );
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
            >
              {robots.map((robot) => (
                <FormControlLabel
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
                  label={<Typography>{robot.label}</Typography>}
                  sx={{
                    width: "fit-content",
                    marginLeft: "0 !important",
                  }}
                />
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
