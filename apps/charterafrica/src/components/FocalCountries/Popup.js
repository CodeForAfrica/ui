import { Link } from "@commons-ui/next";
import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  styled,
  SvgIcon,
} from "@mui/material";
import React from "react";

import XIcon from "@/charterafrica/assets/icons/Type=x, Size=24, Color=CurrentColor.svg";
import { neutral } from "@/charterafrica/colors";
import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";

const BorderLinearProgress = styled(LinearProgress)(() => ({
  height: 4,
  borderRadius: 0,
  "&:before": {
    backgroundColor: neutral[50],
    opacity: 1,
  },
}));

const Popup = React.forwardRef(function Popup(props, ref) {
  const { items, link, onClose, name, sx } = props;

  return (
    <Box
      borderRadius={10}
      bgcolor="common.white"
      gap={1.25}
      p={2.5}
      width={321}
      sx={sx}
      ref={ref}
    >
      <Box display="flex" justifyContent="space-between" mb={1.25}>
        <LineClampedRichTypography
          color={neutral[800]}
          lineClamp={1}
          variant="h4Small"
          typography={{ md: "h4" }}
        >
          {name}
        </LineClampedRichTypography>
        <IconButton onClick={onClose}>
          <SvgIcon
            component={XIcon}
            sx={{
              color: neutral[800],
              display: "inline-flex",
              fill: "none",
            }}
          />
        </IconButton>
      </Box>
      {items?.length > 0 ? (
        <Box display="flex" flexDirection="column" gap="5px" mb={1.25}>
          {items.map((item) => (
            <Box
              color={item.color || neutral[800]}
              display="flex"
              flexDirection="column"
              gap={0.25}
              key={item.name}
            >
              <LineClampedRichTypography
                color="inherit"
                lineClamp={1}
                variant="h3Small"
                typography={{ md: "h3" }}
              >
                {item.value}
              </LineClampedRichTypography>
              <BorderLinearProgress
                color="inherit"
                variant="determinate"
                value={Math.round((item.value * 100) / item.total)}
              />
              <LineClampedRichTypography
                color="inherit"
                lineClamp={1}
                variant="p1SemiBold"
              >
                {item.name}
              </LineClampedRichTypography>
            </Box>
          ))}
        </Box>
      ) : null}
      {link?.label ? (
        <Button
          color="primary"
          component={link.href ? Link : undefined}
          href={link.href}
          onClick={onClose}
          size="small"
          variant="contained"
        >
          {link.label}
        </Button>
      ) : null}
    </Box>
  );
});

export default Popup;
