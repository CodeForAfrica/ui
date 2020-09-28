import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, typography, widths }) => ({
  section: {
    padding: `0 ${typography.pxToRem(23)}`,
    margin: 0,
    width: "100%",
    [breakpoints.up("lg")]: {
      padding: 0,
      margin: "0 auto",
      width: typography.pxToRem(widths.values.lg),
    },
  },
  sectionTitle: {},
  actNow: {
    marginTop: typography.pxToRem(52),
  },
  criteria: {
    marginTop: typography.pxToRem(60),
  },
  criteriaItems: {
    marginTop: typography.pxToRem(25),
  },
  description: {
    marginTop: typography.pxToRem(52),
    [breakpoints.up("lg")]: {
      marginTop: typography.pxToRem(0),
    },
  },
  grid: {
    marginTop: typography.pxToRem(34),
    [breakpoints.up("lg")]: {
      marginTop: typography.pxToRem(43),
    },
  },
  gridAside: {
    order: 0,
    [breakpoints.up("lg")]: {
      order: 1,
    },
  },
  gridMain: {
    order: 1,
    [breakpoints.up("lg")]: {
      order: 0,
    },
  },
  image: {
    display: "flex",
    margin: `0 auto`,
    minWidth: typography.pxToRem(257),
    width: typography.pxToRem(257),
    [breakpoints.up("lg")]: {
      marginTop: typography.pxToRem(0),
      maxWidth: typography.pxToRem(352),
      minWidth: typography.pxToRem(352),
    },
  },
  footer: {
    marginTop: 0,
    [breakpoints.up("lg")]: {
      marginTop: 0,
    },
  },
}));

export default useStyles;
