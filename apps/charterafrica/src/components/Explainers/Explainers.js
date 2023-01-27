import RichTypography from "@/commons-ui/core/RichTypography";
import { Section } from "@commons-ui/core";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import Explainer from "./Explainer";

import { secondary } from "@/charterafrica/colors";

function Explainers({ explainers, title }) {
  return (
    <Box bgcolor={secondary[50]}>
      <Section>
        <Box sx={{ gap: "24px" }}>
          <RichTypography sx={{ pl: 8, pt: 8 }} variant="h3" color="#3E202C">
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
};

Explainers.defaultProps = {
  explainers: [],
  title: "",
};
export default Explainers;
