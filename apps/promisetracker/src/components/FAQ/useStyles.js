import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  section: {},
  sectionTitle: {
    borderBottom: `.4rem solid ${palette.primary.dark}`,
    fontWeight: 600,
    marginBottom: typography.pxToRem(0),
    marginTop: typography.pxToRem(38),
    width: "min-content",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: typography.pxToRem(80),
      borderBottom: `5px solid ${palette.primary.dark}`,
    },
    [breakpoints.up("lg")]: {
      marginTop: typography.pxToRem(60),
    },
  },
  root: {
    marginBottom: typography.pxToRem(52),
    [breakpoints.up("md")]: {
      marginBottom: typography.pxToRem(59),
    },
  },
  accordion: {
    "&:before": {
      backgroundColor: palette.secondary.main,
      height: 2,
      top: -2,
    },
  },
  accordionDetails: {
    padding: `0 ${typography.pxToRem(14)}`,
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
