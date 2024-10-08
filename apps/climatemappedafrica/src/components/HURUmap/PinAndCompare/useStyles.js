import { alpha } from "@mui/material/styles";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(({ typography, palette }) => ({
  root: {
    padding: `${typography.pxToRem(20)} 0`,
    borderBottom: `solid 1px ${palette.divider}`,
  },
  pinButton: {
    maxHeight: typography.pxToRem(40),
    maxWidth: typography.pxToRem(40),
    overflow: "hidden",
    padding: 0,
    marginRight: typography.pxToRem(14),
    backgroundColor: palette.grey.light,
    borderRadius: "0px 2px 2px 0px",
    boxShadow: `0px 3px 6px ${alpha(palette.common.black, 0.16)}`, // #00000029
    "&:hover,&:focus,&:focus-within": {
      backgroundColor: palette.grey.light,
    },
  },
  locationSelect: {
    width: typography.pxToRem(205),
    height: typography.pxToRem(40),
    paddingLeft: 0,
  },
  filled: {
    padding: `${typography.pxToRem(10)} 0 ${typography.pxToRem(
      10,
    )} ${typography.pxToRem(15)} !important`,
  },
  selectPaper: {
    height: typography.pxToRem(310),
  },
}));

export default useStyles;
