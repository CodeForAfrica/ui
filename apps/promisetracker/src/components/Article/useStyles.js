import { makeStyles } from "@material-ui/core/styles";

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
    articleBody: {
      margin: "2rem 0",
      paddingBottom: "4rem",
      borderBottom: `.1rem solid ${palette.secondary.main}`,
    },
    articleFooter: {
      display: "flex",
      justifyContent: "space-between",
    },
    description: {
      marginBottom: "2rem",
    },
    featuredImageContainer: {
      backgroundImage: (props) => `url(${props.image})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      width: "100%",
      height: typography.pxToRem(210),
      [breakpoints.up("lg")]: {
        height: typography.pxToRem(573),
      },
    },
    link: {
      color: "unset",
      "&:hover": {
        textDecoration: "none",
        color: "unset",
      },
    },
    socialMedia: {
      height: "3rem",
      width: "3rem",
      marginLeft: ".2rem",
      background: palette.secondary.main,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      "& img": {
        height: "1.25rem",
        width: "1.25rem",
      },
    },
    socialMediaContainer: {
      display: "none",
      [breakpoints.up("md")]: {
        display: "flex",
        alignItems: "center",
      },
    },
    label: {
      margin: "2rem 0rem",
      color: palette.primary.main,
    },
    title: {
      marginBottom: "2rem",
    },
  })
);

export default useStyles;
