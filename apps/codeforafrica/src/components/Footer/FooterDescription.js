import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import cfaIcon from "@/codeforafrica/assets/images/CfAlogoBW.png";

const DescriptionRoot = styled(Typography)(({ theme: { typography } }) => ({
  marginTop: typography.pxToRem(50),
}));

function FooterDescription({ description }) {
  if (!description) {
    return null;
  }

  return (
    <>
      <Image src={cfaIcon} />
      <DescriptionRoot>{description}</DescriptionRoot>
    </>
  );
}

FooterDescription.propTypes = {
  description: PropTypes.string,
};

FooterDescription.defaultProps = {
  description: undefined,
};

export default FooterDescription;
