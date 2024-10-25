import {
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  tooltipClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

const CustomTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.background.paper,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    ...theme.typography.body1,
    alignItems: "center",
    backgroundColor: theme.palette.background.paper,
    border: `1px solid ${theme.palette.grey.light}`,
    borderRadius: 2,
    color: theme.palette.text.primary,
    display: "flex",
    maxWidth: 220,
    minHeight: 44,
    textTransform: "capitalize",
  },
}));

function PanelButtonGroup({
  items,
  onChange,
  pins = [],
  sx,
  value: valueProp,
}) {
  const handleChange = (_, selected) => {
    onChange(selected);
  };
  const isPin = (current) => {
    return pins.includes(current);
  };

  if (!items?.length) {
    return null;
  }
  return (
    <Box sx={sx}>
      <ToggleButtonGroup
        orientation="vertical"
        value={valueProp}
        exclusive
        onChange={handleChange}
      >
        {items.map(({ icon, title, value, ...buttonProps }) => (
          <CustomTooltip
            title={value.replace("-", " ")}
            placement="right"
            key={value}
          >
            <ToggleButton
              {...buttonProps}
              id={value}
              value={value}
              sx={[
                ({ palette, typography }) => ({
                  backgroundColor: palette.grey.light,
                  padding: 0,
                  // -5px is to ensure no boxShadow to the left of button
                  boxShadow: `0px 3px 6px -5px #00000029`,
                  marginBottom: typography.pxToRem(10),
                  borderRadius: "0px 2px 2px 0px",
                  borderLeft: `1px solid ${palette.grey.light}`,
                  "& .icon": {
                    filter: "brightness(0)",
                  },
                  "&.Mui-selected": {
                    backgroundColor: palette.background.default,
                    borderLeft: `1px solid transparent`,
                    "& .icon": {
                      filter: "none",
                    },
                    "&:hover": {
                      backgroundColor: palette.background.default,
                      borderLeft: `1px solid transparent`,
                    },
                  },
                  "&.Mui-disabled": {
                    backgroundColor: palette.grey.light,
                    "& .icon": {
                      opacity: 0.2,
                    },
                  },
                  "&.MuiToggleButtonGroup-groupedVertical:not(:last-child)": {
                    borderRadius: " 0px 2px 2px 0px",
                  },
                  "&.MuiToggleButtonGroup-groupedVertical:not(:first-child)": {
                    borderRadius: " 0px 2px 2px 0px",
                  },
                  "&:hover": {
                    "& .icon": {
                      filter: "none",
                    },
                    backgroundColor: palette.background.default,
                    borderLeft: `1px solid transparent`,
                  },
                }),
                ({ palette }) =>
                  isPin(value) && {
                    backgroundColor: palette.primary.main,
                    "&.Mui-selected": {
                      backgroundColor: palette.primary.main,
                      "& .icon": {
                        filter: "brightness(0) invert()",
                      },
                      "&:hover": {
                        backgroundColor: palette.primary.main,
                      },
                    },
                    "& .icon": {
                      filter: "brightness(0) invert()",
                    },
                  },
                ({ palette }) =>
                  value === "secondaryPin" && {
                    backgroundColor: palette.secondary.main,
                    "&.Mui-selected": {
                      backgroundColor: palette.secondary.main,
                      "& .icon": {
                        filter: "brightness(0) invert()",
                      },
                      "&:hover": {
                        backgroundColor: palette.secondary.main,
                      },
                    },
                    "& .icon": {
                      filter: "brightness(0) invert()",
                    },
                  },
              ]}
            >
              <Image className="icon" src={icon} width={44} height={44} />
            </ToggleButton>
          </CustomTooltip>
        ))}
      </ToggleButtonGroup>
    </Box>
  );
}

PanelButtonGroup.propTypes = {
  pins: PropTypes.arrayOf(PropTypes.string),
  items: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      href: PropTypes.string,
    }),
  ),
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default PanelButtonGroup;
