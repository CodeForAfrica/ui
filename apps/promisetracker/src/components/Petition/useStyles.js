import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(
  ({ breakpoints, typography, palette, widths }) => ({
    section: {
      padding: `0 ${typography.pxToRem(23)}`,
      margin: 0,
      width: "100%",
      [breakpoints.up("lg")]: {
        padding: 0,
        margin: "0 auto",
        width: typography.pxToRem(widths.values.lg),
      },
    },
    mobileStatus: {
      marginTop: 0,
    },
    mobileStatusContainer: {
      marginTop: "2rem",
      display: "flex",
      alignItems: "center",
      borderTop: `.1rem solid ${palette.secondary.light}`,
      borderBottom: `.1rem solid ${palette.secondary.light}`,
      padding: ".5rem 0",
    },
    mobileStatusLabelGrid: {
      display: "flex",
      justifyContent: "space-between",
      width: "100%",
      alignItems: "center",
    },
    petitionBody: {
      margin: "2rem 0",
    },
    petitionTitle: {
      fontWeight: 600,
      marginTop: "1rem",
      marginBottom: "2rem",
      [breakpoints.up("lg")]: {
        marginTop: typography.pxToRem(27),
        position: "relative",
        "&:after": {
          content: '""',
          position: "absolute",
          bottom: 0,
          left: 0,
          width: typography.pxToRem(72),
          borderBottom: `8px solid ${palette.highlight.light}`,
        },
      },
    },
    featuredImageContainer: {
      backgroundImage: (props) => `url("${props.image}")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      width: "100%",
      height: typography.pxToRem(210),
      [breakpoints.up("lg")]: {
        height: typography.pxToRem(477),
      },
    },
    label: {
      marginTop: "2rem",
      marginBottom: "1rem",
      width: typography.pxToRem(171),
      fontWeight: "bold",

      color: palette.primary.main,
      "& span": {
        color: "#005DFD",
      },
    },
    progressBar: {
      background: "#EBEBEB",
      height: typography.pxToRem(15),
    },
    barColor: {
      background: "#005DFD",
    },
    owner: {
      margin: `${typography.pxToRem(40)} 0`,
      display: "inline",
      position: "relative",
      top: "5px",
      fontSize: typography.pxToRem(24),
      "& span": {
        fontWeight: "bold",
        textTransform: "capitalize",
      },
    },
    ownerSection: {
      marginTop: typography.pxToRem(20),
    },
    shareTitle: {
      marginBottom: typography.pxToRem(20),
    },
    flexItem: {
      display: "flex",
      flexWrap: "wrap",
    },
    iconButton: {
      backgroundColor: "#EBEBEB",
      margin: `0 ${typography.pxToRem(20)} ${typography.pxToRem(20)} 0`,
      padding: "3%",
      width: "60px",
      height: "60px",
    },
    usericonButton: {
      backgroundColor: "#EBEBEB",
      marginRight: typography.pxToRem(10),
      padding: "3%",
      width: "40px",
      height: "40px",
    },
    petition: {
      marginTop: typography.pxToRem(60),
    },
    petitionContainer: {
      background: "#F7F7F7",
      padding: `${typography.pxToRem(56)} 0`,
      marginBottom: typography.pxToRem(96),
    },
    cardButtonRoot: {
      margin: 0,
    },
    cardButton: {
      marginTop: typography.pxToRem(10),
      border: `1px solid #005DFD`,
      background: "#fff",
      [breakpoints.up("sm")]: {
        marginTop: 0,
      },
    },
    status: {
      fontSize: "1rem",
      marginTop: "0",
      padding: "1.5rem 1rem",
    },
    statusLabel: {
      marginBottom: "1rem",
      marginTop: "2rem",
    },
    title: {
      marginBottom: "2rem",
    },
  }),
);

export default useStyles;
