import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, typography, palette }) => ({
  filterGridContainer: {
    marginTop: "1.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: "1rem",
  },
  section: {},
  sectionTitle: {
    marginBottom: typography.pxToRem(32),
    marginTop: typography.pxToRem(64),
    position: "relative",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: typography.pxToRem(80),
      borderBottom: `5px solid ${palette.primary.dark}`,
    },
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
