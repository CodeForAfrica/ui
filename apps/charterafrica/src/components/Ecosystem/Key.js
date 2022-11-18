import Box from "@mui/material/Box";
import React from "react";

import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";

const Key = React.forwardRef(function Key(props, ref) {
  const { data, title, ...other } = props;

  if (!data?.length) {
    return null;
  }
  return (
    <Box display="flex" flexDirection="column" gap={2.5} {...other} ref={ref}>
      <LineClampedRichTypography
        lineClamp={1}
        variant="p1SemiBold"
        textTransform="title"
      >
        {title}
      </LineClampedRichTypography>
      <Box
        display="flex"
        flexDirection={{ xs: "row", md: "column" }}
        flexWrap="wrap"
        gap={1.25}
        maxHeight={{ md: 180 }}
      >
        {data.map((datum) => (
          <Box
            alignItems="center"
            display="flex"
            flexWrap="nowrap"
            gap={1.25}
            key={datum.label}
          >
            <Box
              borderRadius={7}
              height={14}
              width={14}
              sx={{ backgroundColor: datum.color }}
            />
            <LineClampedRichTypography lineClamp={1} variant="p1">
              {datum.label}
            </LineClampedRichTypography>
          </Box>
        ))}
      </Box>
    </Box>
  );
});

export default Key;
