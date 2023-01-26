import RichTypography from "@/commons-ui/core/RichTypography";
import { Section } from "@commons-ui/core";
import { Box } from "@mui/material";
import React from "react";

import Explainer from "./Explainer";

import { secondary } from "@/charterafrica/colors";

function Explainers({ explainers }) {
  return (
    <Box bgcolor={secondary[50]}>
      <Section>
        <Box sx={{ m: 4, gap: "24px" }}>
          <RichTypography
            sx={{ padding: 4, marginBottom: 2.5 }}
            variant="h3"
            color="#3E202C"
          >
            Explainers
          </RichTypography>

          {explainers.map((e) => (
            <Explainer {...e} key={e.id} />
          ))}
        </Box>
      </Section>
    </Box>
  );
}

export default Explainers;
