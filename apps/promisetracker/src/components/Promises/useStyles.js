import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, typography, palette }) => ({
  filterGrid: {
    marginBottom: typography.pxToRem(32),
    marginTop: typography.pxToRem(16),
  },
  section: {
    marginBottom: "2rem",
  },
  sectionTitle: {
    marginBottom: typography.pxToRem(32),
    position: "relative",
    "&:after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: typography.pxToRem(80),
      borderBottom: `5px solid ${palette.primary.dark}`,
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
