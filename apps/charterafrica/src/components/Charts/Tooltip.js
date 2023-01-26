import { Box } from "@mui/material";
import React from "react";

import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";

function Tooltip({ label, value }) {
  return (
    <Box
      bgcolor="common.white"
      borderRadius="10px"
      gap="5px"
      px={2.5}
      py="29.77px"
      width={221}
    >
      <LineClampedRichTypography
        color="neutral.dark"
        lineClamp={1}
        variant="numberSmall"
      >
        {value}
      </LineClampedRichTypography>
      <LineClampedRichTypography
        color="neutral.dark"
        lineClamp={1}
        variant="captionCap"
      >
        {label}
      </LineClampedRichTypography>
    </Box>
  );
}
export default Tooltip;
