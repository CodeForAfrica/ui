import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    width: "100%",
  },
  paper: {
    border: `1px solid ${palette.primary.main}`,
    boxShadow: `3px 3px 0px ${palette.common.black}`,
  },
  paperScrollBody: {
    margin: 0,
    verticalAlign: "unset",
  },
  scrollBody: {
    margin: `${typography.pxToRem(40)} ${typography.pxToRem(13)}`,
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
    [breakpoints.down("sm")]: {
      "& .MuiDialog-paperWidthSm.MuiDialog-paperScrollBody": {
        maxWidth: "100%",
      },
    },
  },
  title: {
    display: "flex",
    alignItems: "flex-end",
    flexDirection: "column",
    "& h2": {
      textTransform: "none",
      fontWeight: 600,
      textAlign: "center",
      width: "100%",
      [breakpoints.down("sm")]: {
        fontSize: typography.pxToRem(23),
      },
    },
    [breakpoints.down("sm")]: {
      padding: `
        ${typography.pxToRem(15)}
        ${typography.pxToRem(10)}
        ${typography.pxToRem(15)}
        ${typography.pxToRem(15)}
      `,
    },
    [breakpoints.up("lg")]: {
      padding: `${typography.pxToRem(28)} ${typography.pxToRem(
        34.5
      )} 0 ${typography.pxToRem(34.5)}`,
    },
  },
  closeButton: {
    padding: 0,
  },
  closeIcon: {
    color: palette.primary.main,
    height: 15,
    width: 15,
  },
  content: {
    padding: `${typography.pxToRem(15)} ${typography.pxToRem(15)}`,
  },
  description: {
    color: palette.text.primary,
    margin: 0,
  },
}));

export default useStyles;
