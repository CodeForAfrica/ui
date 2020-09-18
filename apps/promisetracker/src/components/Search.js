import React, { useState } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import { IconButton, InputBase, Paper } from "@material-ui/core";

import searchicon from "@/promisetracker/assets/Page-1.svg";

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {
    alignItems: "center",
    backgroundColor: "#EEEEEE",
    borderRadius: 0,
    boxShadow: "none",
    display: "flex",
    width: "100%",
  },
  input: {
    color: palette.primary.main,
    flex: 1,
    padding: "0rem 2rem",
    fontSize: typography.pxToRem(14),
    fontFamily: typography.fontFamily,
    fontWeight: 500,
  },
  inputInput: {
    flex: 1,
  },
  iconButton: {
    "&:hover": {
      backgroundColor: "unset",
    },
  },
}));

function Search({ ariaLabel, onClick, onChange, placeholder, ...props }) {
  const classes = useStyles(props);
  const [term, setTerm] = useState();
  const handleChange = (e) => {
    setTerm(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };
  const handleClick = (e) => {
    if (onClick) {
      const ev = e;
      ev.target.value = term;
      onClick(ev);
    }
  };
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Do code here
      e.preventDefault();
      if (onClick) {
        onClick(e);
      }
    }
  };

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        inputProps={{ "aria-label": ariaLabel }}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        classes={{
          root: classes.input,
          input: classes.inputInput,
        }}
        {...props}
      />
      <IconButton
        onClick={handleClick}
        className={classes.iconButton}
        aria-label="search"
      >
        <img src={searchicon} alt="Search Icon" />
      </IconButton>
    </Paper>
  );
}

Search.propTypes = {
  ariaLabel: PropTypes.string,
  placeholder: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};

Search.defaultProps = {
  ariaLabel: "",
  placeholder: "SEARCH",
};
export default Search;
