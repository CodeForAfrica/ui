import { Section } from "@commons-ui/core";
import { RichTypography } from "@commons-ui/next";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import ImpactCardList from "@/codeforafrica/components/ImpactCardList";

const OurImpact = React.forwardRef(function OurImpact(props, ref) {
  const { impacts, title, sx } = props;

  if (!impacts?.length) {
    return null;
  }
  return (
    <Box
      sx={{
        backgroundColor: "background.main",
        ...sx,
      }}
      ref={ref}
    >
      <Section
        sx={{
          px: { xs: 2.5, md: 0 },
          py: { xs: 7.5, sm: 10, md: 8, lg: 12.5 },
        }}
      >
        {title && (
          <RichTypography
            sx={{
              pb: { xs: 10, md: 5, lg: 7.5 },
            }}
            variant="h4"
          >
            {title}
          </RichTypography>
        )}
        <ImpactCardList list={impacts} />
      </Section>
    </Box>
  );
});

OurImpact.propTypes = {
  impacts: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
};

OurImpact.defaultProps = {
  impacts: undefined,
  title: undefined,
};

export default OurImpact;
