import React, { useState } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import { IconButton, InputBase, Paper } from "@material-ui/core";

import SearchIcon from "@/promisetracker/icons/Search";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
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
  searchButton: {
    "&:hover": {
      backgroundColor: "unset",
    },
    [breakpoints.up("lg")]: {
      padding: typography.pxToRem(10),
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
        className={classes.searchButton}
        aria-label="search"
      >
        <SearchIcon fontSize="inherit" />
      </IconButton>
    </Paper>
  );
}

Search.propTypes = {
  ariaLabel: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  onClick: PropTypes.func,
};

Search.defaultProps = {
  ariaLabel: "",
  onChange: undefined,
  onClick: undefined,
  placeholder: "SEARCH",
};
export default Search;
