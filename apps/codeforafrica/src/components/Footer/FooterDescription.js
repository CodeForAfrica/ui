import { Typography } from "@mui/material";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import cfaIcon from "@/codeforafrica/assets/images/CfAlogoBW.png";

function FooterDescription({ description }) {
  if (!description) {
    return null;
  }

  return (
    <>
      <Image src={cfaIcon} alt="" />
      <Typography sx={{ marginTop: "3.125rem" }}>{description}</Typography>
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
