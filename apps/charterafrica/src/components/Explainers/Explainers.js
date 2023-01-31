import RichTypography from "@/commons-ui/core/RichTypography";
import { Section } from "@commons-ui/core";
import { Box, Divider } from "@mui/material";
import PropTypes from "prop-types";
import React, { Fragment } from "react";

import Explainer from "./Explainer";

import { secondary } from "@/charterafrica/colors";

const Explainers = React.forwardRef(function Explainers(props, ref) {
  const { explainers, sx, title } = props;

  if (!explainers?.length) {
    return null;
  }
  return (
    <Box bgcolor={secondary[50]} sx={sx} ref={ref}>
      <Section
        sx={{
          px: { xs: 5, sm: 0 },
          py: { xs: 5, md: 5.75 },
          // Hide last Divider
          "& hr:last-child": {
            display: "none",
          },
        }}
      >
        <RichTypography variant="h3" color="neutral.dark" sx={{ mb: 5 }}>
          {title}
        </RichTypography>

        {explainers.map((e) => (
          <Fragment key={e.id}>
            <Explainer {...e} key={e.id} />
            <Divider sx={{ my: 5 }} />
          </Fragment>
        ))}
      </Section>
    </Box>
  );
});

Explainers.propTypes = {
  explainers: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
};

Explainers.defaultProps = {
  explainers: undefined,
  title: undefined,
};

export default Explainers;
