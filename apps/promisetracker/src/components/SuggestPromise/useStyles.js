import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#F7F7F7",
    padding: "1rem",
  },
  suggestPromiseBtn: {
    backgroundColor: palette.common.white,
    color: palette.google.main,
    border: `1px solid ${palette.google.main}`,
    padding: "1rem",
  },
  description: {
    marginTop: typography.pxToRem(52),
    [breakpoints.up("lg")]: {
      marginTop: typography.pxToRem(10),
    },
    textAlign: "left",
    color: palette.common.black,
  },
}));

export default useStyles;
