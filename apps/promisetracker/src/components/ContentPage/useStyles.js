import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(
  ({ breakpoints, palette, typography, widths }) => ({
    root: (props) => {
      return {
        backgroundColor:
          props.slug === "act-now" ? "#ebebeb" : palette.secondary.light,
      };
    },
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
    sectionTitle: {},
    grid: {
      marginTop: typography.pxToRem(34),
      [breakpoints.up("lg")]: {
        marginTop: typography.pxToRem(43),
      },
    },
    gridAside: {
      order: 0,
      [breakpoints.up("lg")]: {
        order: 1,
      },
    },
    gridContent: {
      order: 1,
      [breakpoints.up("lg")]: {
        order: 0,
      },
    },
    footer: {
      marginTop: 0,
    },
  })
);

export default useStyles;
