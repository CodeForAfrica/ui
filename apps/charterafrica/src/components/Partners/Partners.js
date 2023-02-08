import { RichTypography, Section } from "@commons-ui/core";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import RichText from "../RichText";

import Partnership from "./Partnership";

const Partners = React.forwardRef(function Partners(props, ref) {
  const { description, partners, sx, title } = props;
  const hasPartners = !!partners.length;

  if (!hasPartners) {
    return null;
  }

  return (
    <Box bgcolor="common.white" sx={sx} ref={ref}>
      <Section sx={{ px: { xs: 5, sm: 0 }, py: { xs: 5, md: 10 } }}>
        <RichTypography
          color="primary.dark"
          variant="h3Small"
          component="h3"
          textAlign="center"
          sx={{ typography: { md: "h3" }, marginBottom: 3.5 }}
        >
          {title}
        </RichTypography>

        <RichText
          textAlign="center"
          variant="caption"
          typography={{ md: "p2" }}
          elements={description}
        />
        {partners.map((partner, i) => (
          <Partnership
            {...partner}
            key={partner.id}
            showDivider={i < partners.length - 1}
          />
        ))}
      </Section>
    </Box>
  );
});

Partners.propTypes = {
  partners: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
};

Partners.defaultProps = {
  partners: [],
  title: undefined,
};

export default Partners;
