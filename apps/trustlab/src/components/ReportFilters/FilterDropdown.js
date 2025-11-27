import { Button, Menu, MenuItem, ListItemText, SvgIcon } from "@mui/material";
import React, { useState } from "react";

import RightIcon from "@/trustlab/assets/icons/chevron-down.svg";

function FilterDropdown({
  label,
  options,
  selected = [],
  onChange,
  startIcon,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const toggle = (opt) => {
    const val = opt?.value ?? opt;
    const exists = selected.includes(val);
    const next = exists
      ? selected.filter((v) => v !== val)
      : [...selected, val];
    onChange?.(next);
    handleClose();
  };

  const count = selected.length;
  const buttonLabel = `${label}${count ? ` (${count})` : ""}`;

  return (
    <>
      <Button
        variant="outlined"
        size="small"
        onClick={handleOpen}
        startIcon={startIcon}
        sx={{
          textTransform: "none",
          backgroundColor: "#fff",
          borderRadius: "10px",
          border: "1px solid #C9CACB",
          display: "inline-flex",
          alignItems: "center",
          lineHeight: 1,
          // normalize icon container spacing/alignment
          "& .MuiButton-startIcon": {
            m: 0,
            display: "inline-flex",
            alignItems: "center",
          },
          "& .MuiButton-endIcon": {
            m: 0,
            display: "inline-flex",
            alignItems: "center",
          },
          // normalize inner svg sizing and baseline shift
          "& .MuiButton-startIcon svg, & .MuiButton-endIcon svg": {
            fontSize: 16,
            display: "block",
          },
        }}
        endIcon={
          <SvgIcon
            component={RightIcon}
            inheritViewBox
            sx={{
              fill: "none",
              fontSize: 16,
              display: "block",
              mt: "-4px",
            }}
          />
        }
      >
        {buttonLabel}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        onClose={handleClose}
      >
        {options.map((opt) => {
          const val = opt?.value ?? opt;
          const text = opt?.label ?? String(opt);
          return (
            <MenuItem key={val} onClick={() => toggle(opt)}>
              <ListItemText primary={text} />
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}

export default FilterDropdown;
