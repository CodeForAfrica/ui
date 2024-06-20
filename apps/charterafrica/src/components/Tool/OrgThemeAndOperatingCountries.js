import { RichTypography } from "@commons-ui/core";
import { Figure, Link } from "@commons-ui/next";
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
        <Box
          display="flex"
          sx={{
            justifyContent: {
              xs: "center",
              sm: "left",
              display: "flex",
            },
          }}
        >
          <Figure
            ImageProps={{
              alt: organisation.name,
              src: organisation.avatarUrl,
            }}
            sx={{
              height: 50,
              width: 150,
            }}
          />
        </Box>
        <Box
          display="flex"
          sx={{
            justifyContent: {
              xs: "center",
              sm: "left",
              display: "flex",
            },
          }}
        >
          <Link
            href={organisation?.link?.href || "#"}
            textAlign="left"
            color="neutral.dark"
            sx={{ textDecoration: "none", fontWeight: 400 }}
            variant="h4"
          >
            {organisation.name}
          </Link>
        </Box>
        <Box
          sx={{
            justifyContent: {
              xs: "center",
              sm: "left",
              display: "flex",
            },
          }}
        >
          {theme ? (
            <Button
              variant="contained"
              component="div"
              sx={{
                backgroundColor: "success.main",
                color: "neutral.dark",
                mt: 3.75,
              }}
            >
              {theme}
            </Button>
          ) : null}
        </Box>
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
