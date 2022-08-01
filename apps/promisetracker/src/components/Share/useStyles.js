import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles(() => ({
  root: {
    zIndex: 999,
    marginRight: "0.2rem",
  },
  icon: {
    color: "#6A6A6A",
  },
  socialIconPopper: {
    padding: "0.5rem",
  },
  popper: {
    margintop: "10px",
  },
  imgGrid: {
    padding: "0.5rem",
    pointerEvents: "auto",
    "&:hover": {
      cursor: "pointer",
      pointerEvents: "auto",
    },
  },
  socialLink: {
    display: "inline-flex",
    padding: "0.5rem !important",
  },
  share: {
    fontSize: "1rem",
    textAlign: "center",
    "&:hover": {
      cursor: "pointer",
    },
  },
  svgIcon: {
    width: "1rem",
    height: "1rem",
  },
}));

export default useStyles;
