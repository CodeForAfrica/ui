import { Link } from "@commons-ui/next";
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
      <Link href="/">
        <Image src={cfaIcon} alt="" />
      </Link>
      <Typography
        variant="body1"
        sx={{ marginTop: "3.125rem", fontSize: { md: 12, xs: 12 } }}
      >
        {description}
      </Typography>
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
