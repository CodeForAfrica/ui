/* eslint-env browser */
import { Link } from "@commons-ui/next";
import { Box, Button, Popover } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import Caret from "@/climatemappedafrica/assets/icons/caret.svg";
import slugify from "@/climatemappedafrica/utils/slugify";

function SubcategoryList({ items }) {
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
    <Box
      sx={({ zIndex }) => ({
        position: "sticky",
        top: 66 + 60, // below navbar and category list tab
        zIndex: zIndex.appBar,
      })}
    >
      <Button
        onClick={handleCaretClick}
        sx={({ palette, typography }) => ({
          alignItems: "center",
          backgroundColor: palette.grey.light,
          color: "#666666", // Match current tab background
          display: "flex",
          height: typography.pxToRem(29), // Match tab height
          justifyContent: "center",
          width: "100%",
          "&:active,&:hover, &:focus, &:focus-within": {
            backgroundColor: palette.grey.light,
          },
          "&:after": {
            display: "none",
          },
        })}
      >
        <Caret />
      </Button>
      <Popover
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
        sx={({ typography }) => ({
          "& .MuiPopover-paper": {
            backgroundColor: "#F0F0F0",
            borderRadius: 0,
            boxShadow: "unset",
            left: "0",
            maxWidth: "100%",
            paddingTop: typography.pxToRem(9),
            paddingBottom: typography.pxToRem(24),
            right: 0,
          },
        })}
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
            sx={[
              ({ typography }) => ({
                color: typography.caption.color,
                cursor: "pointer",
                display: "block",
                marginBottom: typography.pxToRem(10),
                opacity: 0.2,
                textAlign: "center",
                width: "100%",
              }),
              selectedIndex === index && {
                opacity: 1.0,
              },
            ]}
          >
            {title}
          </Link>
        ))}
      </Popover>
    </Box>
  );
}
SubcategoryList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})),
};

export default SubcategoryList;
