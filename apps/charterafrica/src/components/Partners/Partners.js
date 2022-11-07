import { RichTypography, Section } from "@commons-ui/core";
import PropTypes from "prop-types";
import React from "react";

import Partnership from "./Partnership";

const Partners = React.forwardRef(function Partners(props, ref) {
  const { consortium, fund, project, title } = props;
  const hasPartners =
    consortium?.partners?.length ||
    fund?.partners?.length ||
    project?.partners?.length;

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
      <Partnership {...consortium} />
      <Partnership {...project} GridItemProps={{ sm: 6 }} />
      <Partnership
        {...fund}
        justifyContent="center"
        DividerProps={{ sx: { display: { sm: "none" } } }}
      />
    </Section>
  );
});

Partners.propTypes = {
  consortium: PropTypes.shape({}),
  fund: PropTypes.shape({}),
  project: PropTypes.shape({}),
  title: PropTypes.string,
};

Partners.defaultProps = {
  consortium: undefined,
  fund: undefined,
  project: undefined,
  title: undefined,
};

export default Partners;
