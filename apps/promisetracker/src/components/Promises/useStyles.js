import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, typography, palette }) => ({
  section: {},
  sectionTitle: {
    width: "4.5rem",
    fontWeight: 600,
    marginBottom: typography.pxToRem(32),
    borderBottom: `.4rem solid ${palette.primary.dark}`,
    paddingRight: "1.5rem",
    marginTop: typography.pxToRem(64),
    [breakpoints.up("lg")]: {
      width: "5rem",
      marginBottom: 0,
      marginTop: typography.pxToRem(35),
    },
  },
  row: {
    paddingTop: typography.pxToRem(30),
    [breakpoints.up("lg")]: {
      paddingTop: typography.pxToRem(16),
    },
  },
}));

export default useStyles;
