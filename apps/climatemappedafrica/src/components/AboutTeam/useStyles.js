import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(({ breakpoints, palette }) => ({
  dotList: ({ membersCount }) => ({
    display: membersCount > 2 ? "flex" : "none",
    "& button": {
      borderColor: "#000",
      background: palette.background.paper,
    },
    "& .react-multi-carousel-dot--active button": {
      borderColor: "#000",
    },
    [breakpoints.up("md")]: {
      display: membersCount > 4 ? "flex" : "none",
    },
  }),
}));

export default useStyles;
