import { makeStyles as tssMakeStyles } from "tss-react/mui";

// Compatibility wrapper to replace `@mui/styles/makeStyles`.
// - Keeps the same call signature:
//   const useStyles = makeStyles((theme) => ({ ... }));
//   const classes = useStyles(props);
// - Internally uses tss-react (Emotion engine), compatible with MUI v5/v6.
export default function makeStyles(stylesArg) {
  const useTss = tssMakeStyles()(
    typeof stylesArg === "function"
      ? (theme, params, classes) => stylesArg(theme, params, classes)
      : (_theme, _params, _classes) => stylesArg || {},
  );

  // Return classes directly to match the legacy API
  return function useStyles(params) {
    const { classes } = useTss(params);
    return classes;
  };
}
