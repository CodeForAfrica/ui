import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(({ typography, breakpoints }) => ({
  section: {},
  paperScrollBody: {
    margin: 0,
  },
  paperWidthSm: {
    maxWidth: typography.pxToRem(716),
  },
  scrollBody: {},
  root: {
    width: "100%",
    backgroundColor: "#F7F7F7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [breakpoints.up("lg")]: {
      padding: `${typography.pxToRem(25)} 0`,
    },
  },
  title: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#F7F7F7",
    borderRadius: `0 0 ${typography.pxToRem(10)} ${typography.pxToRem(10)}`,
    border: "1px solid #ebebeb",
    padding: `
        ${typography.pxToRem(19)} ${typography.pxToRem(51.5)}
        ${typography.pxToRem(18)} ${typography.pxToRem(55)}
    `,
  },
  content: {
    padding: `${typography.pxToRem(51)} ${typography.pxToRem(51)}`,
    [breakpoints.down("sm")]: {
      padding: `${typography.pxToRem(15)} ${typography.pxToRem(15)}`,
    },
  },
}));

export default useStyles;
