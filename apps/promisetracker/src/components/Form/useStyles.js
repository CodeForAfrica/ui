import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ palette, typography }) => ({
  input: {
    backgroundColor: palette.secondary.light,
    border: `1px solid ${palette.secondary.main}`,
    display: "flex",
    marginTop: typography.pxToRem(20),
  },
  label: {
    ...typography.h4,
    color: palette.text.primary,
    marginTop: typography.pxToRem(40),
  },
}));

export default useStyles;
