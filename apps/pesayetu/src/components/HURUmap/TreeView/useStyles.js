import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(({ typography, palette }) => ({
  root: {
    textAlign: "right",
    background: palette.background.paper,
    "& .MuiTreeItem-content.Mui-selected": {
      backgroundColor: "unset",
    },
    "& .MuiTreeItem-iconContainer": {
      width: 0,
    },
    "& .MuiTreeItem-iconContainer svg": {
      display: "none",
    },
    "& .MuiTreeItem-content": {
      padding: 0,
      borderRadius: 0,
      "&.Mui-expanded": {
        borderRightColor: palette.primary.main,
        borderRightWidth: typography.pxToRem(2),
        borderRightStyle: "Solid",
        backgroundColor: palette.background.default,
        borderBottom: `1px solid ${palette.grey.main}`,
      },
    },
  },
  label: {
    marginRight: typography.pxToRem(20),
    height: typography.pxToRem(38),
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    fontWeight: 500,
    letterSpacing: 0.6,
  },
  childLabel: {
    fontWeight: 300,
  },
  icon: {
    marginLeft: typography.pxToRem(20),
    fill: palette.grey.main,
    width: typography.pxToRem(19),
  },
  expanded: {
    "& .MuiCollapse-root": {
      marginLeft: 0,
    },
    "& $icon": {
      fill: "#666666",
    },
  },
}));

export default useStyles;
