import { Button, useTheme } from "@mui/material";
import PropTypes from "prop-types";
import React, { forwardRef, useState, useRef } from "react";

import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";

const DynamicLineClampedTypography = forwardRef(
  ({ comment, ...props }, ref) => {
    const ref1 = useRef();
    const commentHeight = ref1?.current?.offsetHeight;
    const currentTheme = useTheme();
    const lineHeight =
      currentTheme.typography.p3.lineHeight *
      currentTheme.typography.p3.fontSize;
    const showReadMore = commentHeight >= lineHeight * 3;

    const [readMoreOpen, setReadMoreOpen] = useState(false);
    const lineClamp = !readMoreOpen ? 2 : undefined;

    return (
      <>
        <LineClampedRichTypography
          ref={ref}
          lineClamp={lineClamp}
          variant="p3"
          {...props}
        >
          {/* eslint-disable-next-line react/no-danger */}
          <span dangerouslySetInnerHTML={{ __html: comment }} ref={ref1} />
        </LineClampedRichTypography>

        {showReadMore ? (
          <Button
            onClick={() => setReadMoreOpen((v) => !v)}
            sx={(theme) => ({
              ...theme.typography.p2,
              mt: 2,
              p: 0,
              color: theme.palette.neutral.main,
            })}
          >
            {readMoreOpen ? "Read less" : `Read more`}
          </Button>
        ) : null}
      </>
    );
  }
);

DynamicLineClampedTypography.propTypes = {
  comment: PropTypes.string.isRequired,
};

export default DynamicLineClampedTypography;
