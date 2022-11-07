import { RichTypography } from "@commons-ui/core";
import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";
import React from "react";

import PartnerGrid from "./PartnerGrid";

function Partnership({ partners, description, DividerProps, ...other }) {
  if (!partners?.length) {
    return null;
  }
  return (
    <>
      <PartnerGrid partners={partners} {...other} />
      <RichTypography
        variant="caption"
        component="p"
        sx={{
          pt: { xs: 2.5, md: "30px" },
          typography: { md: "p3" },
        }}
      >
        {description}
      </RichTypography>
      <Divider
        {...DividerProps}
        sx={{
          pt: { xs: 2.5, md: "30px" },
          ...DividerProps?.sx,
        }}
      />
    </>
  );
}

Partnership.propTypes = {
  DividerProps: PropTypes.shape({}),
  description: PropTypes.string,
  partners: PropTypes.arrayOf(PropTypes.shape({})),
};

Partnership.defaultProps = {
  DividerProps: undefined,
  description: undefined,
  partners: undefined,
};

export default Partnership;
