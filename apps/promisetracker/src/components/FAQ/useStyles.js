import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    marginBottom: typography.pxToRem(52),
    [breakpoints.up("lg")]: {
      marginBottom: typography.pxToRem(59),
    },
  },
  accordion: {
    backgroundColor: palette.secondary.light,
    borderBottom: `2px solid ${palette.secondary.main}`,
    "&:before": {
      backgroundColor: palette.secondary.main,
      height: 2,
      top: -2,
    },
    "&.Mui-expanded": {
      margin: 0,
      "&:before": {
        opacity: 1,
      },
    },
  },
  accordionDetails: {
    padding: `${typography.pxToRem(8)} ${typography.pxToRem(
      14
    )} ${typography.pxToRem(22)} ${typography.pxToRem(14)}`,
  },
  accordionExpanded: {},
  accordionSummary: {
    padding: `0 ${typography.pxToRem(14)}`,
  },
  accordionSummaryContent: {
    margin: `${typography.pxToRem(14)} 0`,
  },
  faqContainer: {
    marginTop: typography.pxToRem(38),
    width: "100%",
    [breakpoints.up("lg")]: {
      marginTop: typography.pxToRem(42),
    },
  },
}));

export default useStyles;
