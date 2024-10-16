import { Popover, Button } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import Caret from "@/climatemappedafrica/assets/icons/caret.svg";
import Link from "@/climatemappedafrica/components/Link";
import slugify from "@/climatemappedafrica/utils/slugify";

const useStyles = makeStyles(({ palette, typography, zIndex }) => ({
  root: {
    position: "sticky",
    top: 64 + 60, // below navbar and category list tab
    zIndex: zIndex.appBar,
  },
  caretContainer: {
    alignItems: "center",
    backgroundColor: palette.grey.light,
    display: "flex",
    height: typography.pxToRem(16),
    justifyContent: "center",
    width: "100%",
    "&:active,&:hover, &:focus, &:focus-within": {
      backgroundColor: palette.grey.light,
    },
    "&:after": {
      display: "none",
    },
  },
  paper: {
    width: "100%",
    left: "0 !important",
    right: 0,
    maxWidth: "unset",
    backgroundColor: "#F0F0F0",
    borderRadius: 0,
    boxShadow: "unset",
    paddingTop: typography.pxToRem(9),
    paddingBottom: typography.pxToRem(24),
  },
  title: {
    width: "100%",
    textAlign: "center",
    marginBottom: typography.pxToRem(10),
    display: "block",
    cursor: "pointer",
    color: typography.caption.color,
  },
  notSelected: {
    opacity: 0.2,
  },
}));

function SubcategoryList({ items }) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleCaretClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelect = (event) => {
    setSelectedIndex(Number(event.target.dataset.index));
    /* eslint-env browser */
    document
      .getElementById(slugify(event.target.dataset.title))
      .scrollIntoView({ behavior: "smooth" });
    handleClose();
  };
  const open = Boolean(anchorEl);

  if (!items?.length) {
    return null;
  }
  return (
    <div className={classes.root}>
      <Button className={classes.caretContainer} onClick={handleCaretClick}>
        <Caret />
      </Button>
      <Popover
        classes={{ paper: classes.paper }}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {items.map(({ title }, index) => (
          <Link
            key={title}
            onClick={handleSelect}
            data-index={index}
            data-title={title}
            href={`#${slugify(title)}`}
            underline="none"
            variant="caption"
            className={clsx(classes.title, {
              [classes.notSelected]: selectedIndex !== index,
            })}
          >
            {title}
          </Link>
        ))}
      </Popover>
    </div>
  );
}
SubcategoryList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

export default SubcategoryList;
