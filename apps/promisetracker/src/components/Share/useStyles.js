import { makeStyles } from "@material-ui/core/styles";

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
    marginRight: "0.5rem",
    padding: "0.5rem !important",
  },
  socialIcon: {
    color: "#909090",
  },
  share: {
    fontSize: "1.2rem",
    textAlign: "right",
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export default useStyles;
