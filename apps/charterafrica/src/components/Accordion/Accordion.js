import { RichTypography } from "@commons-ui/core";
import {
  styled,
  Accordion as MuiAccordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
  SvgIcon,
} from "@mui/material";
import React, { Fragment } from "react";

import ArrowRight from "@/charterafrica/assets/icons/Type=arrow-right-circle, Size=24, Color=CurrentColor.svg";
import PlusIcon from "@/charterafrica/assets/icons/Type=plus, Size=24, Color=CurrentColor.svg";
import { neutral } from "@/charterafrica/colors";
import RichText from "@/charterafrica/components/RichText";

const AccordionSummaryContentExpandIconWrapper = styled("div", {
  shouldForwardProp: (prop) => !["expanded"].includes(prop),
})(({ expanded, theme }) => ({
  display: "inline-flex",
  transform: "rotate(0deg)",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  ...(expanded && {
    transform: "rotate(90deg)",
  }),
}));

const Accordion = React.forwardRef(function Accordion(props, ref) {
  const { items, sx } = props;
  const [expanded, setExpanded] = React.useState(false);

  if (!items?.length) {
    return null;
  }
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <Fragment ref={ref}>
      {items.map(({ disabled, details, id, summary }) => (
        <MuiAccordion
          expanded={expanded === id}
          disabled={disabled}
          disableGutters
          onChange={handleChange(id)}
          square
          sx={{
            background: "inherit",
            borderBottom: 1,
            borderColor: neutral[100],
            boxShadow: "none",
            color: "neutral.dark",
            "&::before": {
              display: "none",
            },
            ...sx,
          }}
          key={id}
        >
          <AccordionSummary
            expandIcon={
              <SvgIcon
                component={PlusIcon}
                sx={{
                  color: "inherit",
                  display: "inline-flex",
                  fill: "none",
                }}
              />
            }
            aria-controls={`panel-${id}-content`}
            id={`panel-${id}-header`}
            sx={{
              alignItems: "flex-start",
              padding: 0,
              "&.Mui-expanded": {
                color: neutral[300],
              },
              "& .MuiAccordionSummary-expandIconWrapper": {
                my: 1.5,
              },
              "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                transform: "rotate(45deg)",
              },
            }}
          >
            <Grid container columnSpacing={1.25}>
              <Grid item xs="auto">
                <AccordionSummaryContentExpandIconWrapper
                  expanded={expanded === id}
                >
                  <SvgIcon
                    component={ArrowRight}
                    sx={{
                      color: "inherit",
                      display: "inline-flex",
                      fill: "none",
                    }}
                  />
                </AccordionSummaryContentExpandIconWrapper>
              </Grid>
              <Grid item xs={10} container direction="column">
                <Grid item xs="auto">
                  <RichTypography
                    color="inherit"
                    variant="h5"
                    sx={(theme) => ({
                      // must match icon height
                      lineHeight: theme.typography.h5.fontSize / 24,
                    })}
                  >
                    {summary.title}
                  </RichTypography>
                </Grid>
                {summary.excerpt ? (
                  <Grid item>
                    <RichTypography color="inherit" variant="p2">
                      {summary.excerpt}
                    </RichTypography>
                  </Grid>
                ) : null}
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails
            id={`panel-${id}-content`}
            sx={{
              pl: "34px", // icons size (24px) + spacing (10px)
            }}
          >
            <RichText elements={details} variant="p2" />
          </AccordionDetails>
        </MuiAccordion>
      ))}
    </Fragment>
  );
});

export default Accordion;
