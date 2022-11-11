import { RichTypography, Section } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import PropTypes from "prop-types";
import React from "react";

import { neutral, secondary } from "@/charterafrica/colors";

const FocalCountries = React.forwardRef(function FocalCountries(props, ref) {
  const { description, image, sx, title } = props;

  return (
    <Box backgroundColor={secondary[100]} sx={sx} ref={ref}>
      <Section sx={{ px: { xs: 5, sm: 0 }, py: { xs: 2, sm: 0 } }}>
        <Grid
          container
          alignItems="center"
          justifyContent={{ xs: "center", sm: "space-between" }}
        >
          <Grid item xs={12} sm={6} order={{ xs: 0, sm: 1 }}>
            <Box
              bgcolor="common.white"
              maxWidth={524}
              p={{ xs: 2.5, md: "50px" }}
              mx="auto"
            >
              <RichTypography
                color={neutral[800]}
                html={false}
                variant="h1Small"
                typography={{ md: "h1" }}
              >
                {title}
              </RichTypography>
              <RichTypography mt={{ xs: "30px", md: 5 }} variant="p1">
                {description}
              </RichTypography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} order={{ xs: 1, sm: 0 }}>
            <Figure
              sx={{
                height: { xs: 403, sm: 418, md: 629 },
                width: { xs: "calc(100vw - 80px)", sm: "100%" },
              }}
              ImageProps={{ alt: title, ...image }}
            />
          </Grid>
        </Grid>
      </Section>
    </Box>
  );
});

FocalCountries.propTypes = {
  description: PropTypes.node,
  image: PropTypes.shape({}),
  title: PropTypes.node,
};

FocalCountries.defaultProps = {
  description: undefined,
  image: undefined,
  title: undefined,
};

export default FocalCountries;
