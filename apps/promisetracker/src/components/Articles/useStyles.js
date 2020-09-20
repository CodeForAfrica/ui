import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  section: {
    marginBottom: "4rem",
  },
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
  root: {
    width: "calc(((100vw - 100%) / 2) + 100%)",
  },
}));

export default useStyles;
