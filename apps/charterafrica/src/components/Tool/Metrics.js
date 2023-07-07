import { RichTypography } from "@commons-ui/core";
import { Box, SvgIcon } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import CommitIcon from "@/charterafrica/assets/icons/Type=commit, Size=24, Color=CurrentColor.svg";
import ForksIcon from "@/charterafrica/assets/icons/Type=forks, Size=24, Color=CurrentColor.svg";
import StarsIcon from "@/charterafrica/assets/icons/Type=stars, Size=24, Color=CurrentColor.svg";
import ViewsIcon from "@/charterafrica/assets/icons/Type=views, Size=24, Color=CurrentColor.svg";
import formatDateTime from "@/charterafrica/utils/formatDate";

const Metrics = React.forwardRef(function Metrics(props, ref) {
  const {
    sx,
    stars = "0",
    starsText,
    commitText,
    forksText,
    contributorsText,
    lastCommit,
    forks = "0",
    contributors,
  } = props;
  return (
    <Box display="flex" sx={sx} ref={ref} flexWrap="wrap" alignItems="center">
      <Box display="flex" alignItems="center" sx={{ mb: 2, ml: 2 }}>
        <SvgIcon
          inheritViewBox
          component={ViewsIcon}
          sx={{
            color: "text.primary",
            fill: "none",
            height: 25,
            width: 25,
          }}
        />
        <Box sx={{ ml: 1 }}>
          <RichTypography color="neutral.dark">
            {`${contributors.length}`}
          </RichTypography>
          <RichTypography color="neutral.dark">
            {contributorsText}
          </RichTypography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" sx={{ mb: 2, ml: 2 }}>
        <SvgIcon
          inheritViewBox
          component={CommitIcon}
          sx={{
            color: "text.primary",
            fill: "none",
            height: 25,
            width: 25,
          }}
        />
        <Box sx={{ ml: 1 }}>
          <RichTypography color="neutral.dark">
            {lastCommit?.committedDate
              ? formatDateTime(lastCommit?.committedDate, {
                  includeTime: false,
                })
              : "-"}
          </RichTypography>
          <RichTypography color="neutral.dark">{commitText}</RichTypography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" sx={{ mb: 2, ml: 2 }}>
        <SvgIcon
          inheritViewBox
          component={ForksIcon}
          sx={{
            color: "text.primary",
            fill: "none",
            height: 25,
            width: 25,
          }}
        />
        <Box sx={{ ml: 1 }}>
          <RichTypography color="neutral.dark">{forks}</RichTypography>
          <RichTypography color="neutral.dark">{forksText}</RichTypography>
        </Box>
      </Box>
      <Box display="flex" alignItems="center" sx={{ mb: 2, ml: 2 }}>
        <SvgIcon
          inheritViewBox
          component={StarsIcon}
          sx={{
            color: "text.primary",
            fill: "none",
            height: 25,
            width: 25,
          }}
        />
        <Box sx={{ ml: 1 }}>
          <RichTypography color="neutral.dark">{stars}</RichTypography>
          <RichTypography color="neutral.dark">{starsText}</RichTypography>
        </Box>
      </Box>
    </Box>
  );
});

Metrics.propTypes = {
  sx: PropTypes.shape({}),
};

Metrics.defaultProps = {
  sx: undefined,
};

export default Metrics;
