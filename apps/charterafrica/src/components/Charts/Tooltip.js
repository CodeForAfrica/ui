import { Box } from "@mui/material";
import React from "react";

import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";

function Tooltip({ color, formattedValue, label }) {
  return (
    <Box
      bgcolor="common.white"
      borderRadius={1.25}
      border={1}
      gap="5px"
      px={2.5}
      py="29.77px"
      width={221}
      sx={{
        borderColor: color,
      }}
    >
      <LineClampedRichTypography
        color="neutral.dark"
        lineClamp={1}
        variant="numberSmall"
      >
        {formattedValue}
      </LineClampedRichTypography>
      <LineClampedRichTypography color="neutral.dark" variant="captionCap">
        {label}
      </LineClampedRichTypography>
    </Box>
  );
}

export default Tooltip;
