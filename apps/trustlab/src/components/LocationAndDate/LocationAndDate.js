import { RichTypography } from "@commons-ui/next";
import { Divider, Stack } from "@mui/material";

function LocationAndDate({ DividerProps, date, location, sx }) {
  // if both location and date are not present, return null
  if (!(date?.length || location?.length)) {
    return null;
  }
  let divider = null;
  // add divider if both location and date are present
  if (location?.length && date?.length) {
    divider = (
      <Divider
        orientation="vertical"
        flexItem
        variant="middle"
        sx={{ backgroundColor: "text.primary" }}
        {...DividerProps}
      />
    );
  }
  return (
    <Stack direction="row" divider={divider} spacing={1} sx={sx}>
      <RichTypography variant="p2" sx={{ color: "common.black" }}>
        {location}
      </RichTypography>
      <RichTypography variant="p2" sx={{ color: "#828499" }}>
        {date}
      </RichTypography>
    </Stack>
  );
}

export default LocationAndDate;
