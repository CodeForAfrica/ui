import { RichTypography } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import { Stack } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import RichText from "@/charterafrica/components/RichText";

const Explainer = React.forwardRef(function Explainer(props, ref) {
  const { ImageProps, description, image, sx, title } = props;

  return (
    <Stack sx={sx} ref={ref}>
      <Figure
        ImageProps={{
          src: image.url,
          alt: image.alt || title,
          // We're going to set img size directly using style https://nextjs.org/docs/api-reference/next/image#style
          fill: false,
          height: 0,
          width: 0,
          ...ImageProps,
          style: { width: "100%", height: "auto", ...ImageProps?.style },
        }}
      />
      <RichTypography
        color="neutral.dark"
        typography={{ md: "h2" }}
        variant="h3SmallSemiBold"
        mt={3}
      >
        {title}
      </RichTypography>
      <RichText
        color="neutral.dark"
        elements={description}
        mt={1.25}
        typography={{ md: "subheading" }}
        variant="p2"
      />
    </Stack>
  );
});

Explainer.propTypes = {
  image: PropTypes.shape({}),
  description: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
};

Explainer.defaultProps = {
  image: undefined,
  description: undefined,
  title: undefined,
};

export default Explainer;
