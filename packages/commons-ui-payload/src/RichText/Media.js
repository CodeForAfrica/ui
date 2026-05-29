import { Figure, RichTypography } from "@commons-ui/next";
import React from "react";

import { imageFromMedia } from "@/commons-ui/payload/utils";

const Media = React.forwardRef(function Media(props, ref) {
  const { CaptionProps, ImageProps, media, caption, sx, ...others } = props;
  const image = imageFromMedia(media);

  return (
    <Figure
      {...others}
      ImageProps={{
        // We're going to set img size directly using style https://nextjs.org/docs/api-reference/next/image#style
        fill: false,
        height: 0,
        style: { width: "100%", height: "auto" },
        unoptimized: true,
        width: 0,
        ...ImageProps,
        ...image,
      }}
      ref={ref}
    >
      <RichTypography
        component="figcaption"
        html={false}
        variant="caption"
        {...CaptionProps}
        sx={[
          ...(Array.isArray(CaptionProps?.sx)
            ? CaptionProps.sx
            : [CaptionProps?.sx]),
        ]}
      >
        {caption}
      </RichTypography>
    </Figure>
  );
});

export default Media;
