import { RichTypography } from "@commons-ui/core";
import { Figure } from "@commons-ui/next";
import { Box, Button } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const OrgThemeAndOperatingCountries = React.forwardRef(
  function OrgThemeAndOperatingCountries(props, ref) {
    const { sx, organisation, theme, operatingCountries } = props;
    const countries = operatingCountries?.join(", ");
    if (!organisation) {
      return null;
    }
    return (
      <Box sx={sx} ref={ref}>
        <Figure
          ImageProps={{
            alt: organisation.name,
            src: organisation.avatarUrl,
          }}
          sx={{
            height: 50,
            width: "auto",
          }}
        />
        <RichTypography
          textAlign="left"
          color="neutral.dark"
          sx={{ fontWeight: 400 }}
          variant="h4"
        >
          {organisation.name}
        </RichTypography>
        {theme ? (
          <Button
            variant="contained"
            component="div"
            sx={{ backgroundColor: "success.main", color: "neutral.dark" }}
          >
            {theme}
          </Button>
        ) : null}
        <RichTypography color="neutral.dark" variant="p3" sx={{ mt: 3.75 }}>
          {countries}
        </RichTypography>
      </Box>
    );
  },
);

OrgThemeAndOperatingCountries.propTypes = {
  sx: PropTypes.shape(),
  organisation: PropTypes.shape({
    name: PropTypes.string,
    avatarUrl: PropTypes.string,
  }),
  theme: PropTypes.string,
  operatingCountries: PropTypes.arrayOf(PropTypes.string),
};

OrgThemeAndOperatingCountries.defaultProps = {
  sx: undefined,
  theme: undefined,
  operatingCountries: undefined,
  organisation: undefined,
};

export default OrgThemeAndOperatingCountries;
