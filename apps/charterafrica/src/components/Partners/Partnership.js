import Divider from "@mui/material/Divider";
import PropTypes from "prop-types";
import React from "react";

import PartnerGrid from "./PartnerGrid";

import RichText from "@/charterafrica/components/RichText";

function Partnership({ partners, description, DividerProps, ...other }) {
  if (!partners?.length) {
    return null;
  }

  return (
    <>
      <PartnerGrid partners={partners} sx={{ marginBottom: 4 }} {...other} />
      <RichText
        textAlign="center"
        sx={{ fontSize: "18px" }}
        variant="p2"
        elements={description}
      />
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
  description: PropTypes.arrayOf(PropTypes.shape({})),
  partners: PropTypes.arrayOf(PropTypes.shape({})),
};

Partnership.defaultProps = {
  DividerProps: undefined,
  description: undefined,
  partners: undefined,
};

export default Partnership;
