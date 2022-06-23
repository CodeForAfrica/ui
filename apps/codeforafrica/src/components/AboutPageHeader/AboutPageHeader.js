import { Box } from "@mui/material";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

const AboutPageHeader = React.forwardRef(function AboutPageHeader(props, ref) {
  const { background } = props;

  if (!background?.src) {
    return null;
  }
  return (
    <Box
      ref={ref}
      sx={{ width: "100vw", position: "relative", height: "400px" }}
    >
      <Image
        alt={background.alt}
        objectFit="cover"
        layout="fill"
        src={background.src}
      />
    </Box>
  );
});

AboutPageHeader.propTypes = {
  background: PropTypes.shape({
    alt: PropTypes.string,
    src: PropTypes.string,
  }),
};

AboutPageHeader.defaultProps = {
  background: undefined,
};

export default AboutPageHeader;
