import { Box, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";

export default function Legend({ legend, title = "Average Temperature", sx }) {
  if (!legend?.length) {
    return null;
  }
  return (
    <Box
      rowGap={1}
      display="flex"
      flexDirection="column"
      sx={({ palette, typography, zIndex }) => ({
        // match zoom control border color
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: `0px 3px 6px ${alpha(palette.common.black, 0.16)}`,
        position: "absolute",
        top: typography.pxToRem(52),
        // match zoom control position
        right: 10,
        background: alpha(palette.background.default, 0.9),
        pb: 1,
        zIndex: zIndex.appBar - 1,
        ...sx,
      })}
    >
      <Typography
        display="flex"
        alignItems="center"
        minHeight={52}
        variant="caption"
        fontWeight={600}
        sx={{
          borderBottom: `1px solid #ccc`,
          m: 0,
          px: 1,
        }}
      >
        {title}
      </Typography>
      {legend.map(({ min, max, color }) => (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="flex-start"
          gap={1}
          px={1}
          key={`${min}-${max}`}
        >
          <Box
            borderColor={color}
            borderRadius={1}
            height={24}
            width={24}
            sx={{
              backgroundColor: color,
            }}
          />
          <Typography color="text.primary" variant="caption">
            {min} - {max}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
