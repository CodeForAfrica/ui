import { RichTypography } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import React from "react";

const LongFormMediaBlock = React.forwardRef(
  function LongFormMediaBlock(props, ref) {
    const { mediaBlockFields: { image, caption } = {}, sx } = props;

    return (
      <Figure
        ImageProps={{
          src: image.url,
          alt: image.alt || caption,
          // We're going to set img size directly using style https://nextjs.org/docs/api-reference/next/image#style
          fill: false,
          height: 0,
          width: 0,
          style: { width: "100%", height: "auto" },
        }}
        sx={{
          my: 2,
          ...sx,
        }}
        ref={ref}
      >
        <RichTypography
          component="figcaption"
          html={false}
          variant="caption"
          sx={{
            mt: 1,
            typography: {
              md: "p2",
            },
          }}
        >
          {caption}
        </RichTypography>
      </Figure>
    );
  },
);

export default LongFormMediaBlock;
