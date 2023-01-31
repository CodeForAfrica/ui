import RichTypography from "@/commons-ui/core/RichTypography";
import { Section } from "@commons-ui/core";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import Explainer from "./Explainer";

import { secondary } from "@/charterafrica/colors";

function Explainers({ explainers, title, bannerTitle }) {
  return (
    <Box bgcolor={secondary[50]}>
      <Box sx={{ height: 56 }} bgcolor={secondary[200]}>
        <RichTypography
          color="#3E202C"
          sx={{ lineHeight: "56px" }}
          textAlign="center"
        >
          {bannerTitle}
        </RichTypography>
      </Box>
      <Section>
        <Box sx={{ gap: "24px" }}>
          <RichTypography sx={{ pt: 8 }} variant="h3" color="#3E202C">
            {title}
          </RichTypography>

          {explainers.map((e) => (
            <Explainer {...e} key={e.id} />
          ))}
        </Box>
      </Section>
    </Box>
  );
}

Explainers.propTypes = {
  explainers: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
  bannerTitle: PropTypes.string,
};

Explainers.defaultProps = {
  explainers: [],
  title: "",
  bannerTitle: "",
};
export default Explainers;
