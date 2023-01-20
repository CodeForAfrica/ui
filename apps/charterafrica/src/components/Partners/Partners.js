import { RichTypography, Section } from "@commons-ui/core";
import PropTypes from "prop-types";
import React from "react";

import Partnership from "./Partnership";

const Partners = React.forwardRef(function Partners(props, ref) {
  const { partners, title } = props;
  const hasPartners = !!partners.length;

  if (!hasPartners) {
    return null;
  }

  return (
    <Section sx={{ px: { xs: 5, sm: 0 }, py: { xs: 5, md: 10 } }} ref={ref}>
      <RichTypography
        color="primary.dark"
        variant="h3Small"
        component="h3"
        textAlign="center"
        sx={{ typography: { md: "h3" } }}
      >
        {title}
      </RichTypography>
      {partners.map((partner, i) => (
        <Partnership
          {...partner}
          key={partner.id}
          DividerProps={
            i === partners.length - 1 ? { sx: { display: { sm: "none" } } } : {}
          }
        />
      ))}
    </Section>
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
