import { Avatar, Box, SvgIcon } from "@mui/material";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";

import userIcon from "@/charterafrica/assets/icons/Type=user, Size=auto, Color=CurrentColor.svg";
import { neutral } from "@/charterafrica/colors";
import DynamicLineClampedTypography from "@/charterafrica/components/Comments/DynamicLineClampedTypography";
import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";

const CommentsThread = forwardRef((props, ref) => {
  const {
    comment,
    authorProfileImageUrl,
    authorDisplayName,
    publishedAt,
    updatedAt,
  } = props;

  return (
    <Box sx={{ mb: 3 }} ref={ref}>
      <Box display="flex" alignItems="center">
        <Avatar
          sx={(theme) => ({
            bgcolor: theme.palette.common.white,
            color: theme.palette.neutral.main,
          })}
          src={authorProfileImageUrl}
        >
          <SvgIcon
            inheritViewBox
            component={userIcon}
            sx={{
              color: neutral[800],
              fill: "none",
              height: 40,
              width: 40,
            }}
          />
        </Avatar>
        <LineClampedRichTypography
          color="neutral.dark"
          lineClamp={1}
          variant="p2"
          sx={{ ml: 1.25 }}
        >
          {authorDisplayName}
        </LineClampedRichTypography>
        <LineClampedRichTypography
          color="neutral.main"
          lineClamp={1}
          variant="p2"
          sx={{ ml: 1 }}
        >
          {publishedAt} {publishedAt !== updatedAt && "(edited)"}
        </LineClampedRichTypography>
      </Box>
      <DynamicLineClampedTypography sx={{ mt: 1 }} comment={comment} />
    </Box>
  );
});

CommentsThread.propTypes = {
  comment: PropTypes.string.isRequired,
  authorProfileImageUrl: PropTypes.string,
  authorDisplayName: PropTypes.string.isRequired,
  publishedAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
};

CommentsThread.defaultProps = {
  authorProfileImageUrl: undefined,
};

export default CommentsThread;
