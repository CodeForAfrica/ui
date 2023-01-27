import { Divider } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import PartnerGrid from "./PartnerGrid";

import RichText from "@/charterafrica/components/RichText";

function Partnership({ partners, description, showDivider, ...other }) {
  if (!partners?.length) {
    return null;
  }

  return (
    <>
      <PartnerGrid partners={partners} sx={{ marginBottom: 4 }} {...other} />
      <RichText
        textAlign="center"
        variant="caption"
        typography={{ md: "p2" }}
        elements={description}
      />
      {showDivider && (
        <Divider
          sx={{
            pt: { xs: 2.5, md: "30px" },
          }}
        />
      )}
    </>
  );
}

Partnership.propTypes = {
  showDivider: PropTypes.bool,
  description: PropTypes.arrayOf(PropTypes.shape({})),
  partners: PropTypes.arrayOf(PropTypes.shape({})),
};

Partnership.defaultProps = {
  showDivider: true,
  description: undefined,
  partners: undefined,
};

export default Partnership;
