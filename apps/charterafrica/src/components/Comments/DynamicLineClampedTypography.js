import { Box, Button, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import React, { forwardRef, useState, useRef } from "react";

import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";

const DynamicLineClampedTypography = forwardRef(
  ({ comment, sx, ...props }, ref) => {
    const textRef = useRef(null);
    const [commentHeight] = useState(textRef?.current?.offsetHeight);

    const currentTheme = useTheme();
    const lineHeight =
      currentTheme.typography.p3.lineHeight *
      currentTheme.typography.p3.fontSize;
    const hasMore = commentHeight >= lineHeight * 3;

    const [open, setOpen] = useState(false);
    const lineClamp = !open ? 2 : undefined;

    return (
      <Box sx={sx} ref={ref}>
        <LineClampedRichTypography
          lineClamp={lineClamp}
          variant="p3"
          {...props}
        >
          {/* eslint-disable-next-line react/no-danger */}
          <span dangerouslySetInnerHTML={{ __html: comment }} ref={textRef} />
        </LineClampedRichTypography>

        {hasMore ? (
          <Button
            onClick={() => setOpen((v) => !v)}
            sx={(theme) => ({
              ...theme.typography.p2,
              mt: 2,
              p: 0,
              color: theme.palette.neutral.main,
            })}
          >
            {open ? "Read less" : `Read more`}
          </Button>
        ) : null}
      </Box>
    );
  }
);

DynamicLineClampedTypography.propTypes = {
  comment: PropTypes.string.isRequired,
};

export default DynamicLineClampedTypography;
