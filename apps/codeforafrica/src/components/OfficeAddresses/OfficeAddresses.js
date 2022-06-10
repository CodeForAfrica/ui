import { RichTypography, Section } from "@commons-ui/core";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

import AddressCard from "@/codeforafrica/components/AddressCard";
import GoogleMap from "@/codeforafrica/components/GoogleMap";

const OfficeAddressesRoot = styled(Box)(({ theme, ownerState }) => ({
  display: "flex",
  position: "relative",
  [theme.breakpoints.up("md")]: {
    flexDirection: "column-reverse",
    height: ownerState.height,
  },
}));

const OfficeAddresses = React.forwardRef(function OfficeAddresses(props, ref) {
  const { addresses, height = 700, map, title, ...other } = props;
  const [activeAddress, setActiveAddress] = React.useState(
    addresses?.[0] ?? null
  );
  const handleClickAddress = (_, addressTitle) => {
    setActiveAddress(
      addresses.find((address) => address.title === addressTitle)
    );
  };

  if (!addresses?.length) {
    return null;
  }
  const ownerState = { height };
  const mapStyle = { height, width: "100%", ...map?.style };
  return (
    <OfficeAddressesRoot {...other} ownerState={ownerState} ref={ref}>
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "absolute",
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          zIndex: -1,
        }}
      >
        <GoogleMap {...map} {...activeAddress?.map} style={mapStyle} />
      </Box>
      <Section
        sx={{
          bgcolor: "background.default",
          mb: { md: 6, lg: "35px" },
          px: { xs: 2.5, sm: 0, md: 5 },
          py: { xs: "29px", md: 5 },
        }}
      >
        <Grid container columns={10} justifyContent="space-between">
          <Grid item xs={12}>
            <RichTypography textAlign="center" variant="h5">
              {title}
            </RichTypography>
            <Divider sx={{ mt: 1.25 }} />
          </Grid>
          <Grid
            item
            xs={12}
            container
            justifyContent="space-between"
            sx={{ mt: 1.25 }}
          >
            {addresses.map((address) => (
              <Grid
                item
                xs={10}
                sm={5}
                md={2}
                sx={{ order: { xs: 2, md: 0 } }}
                key={address.title}
              >
                <AddressCard
                  {...address}
                  active={address.title === activeAddress.title}
                  onClick={handleClickAddress}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Section>
    </OfficeAddressesRoot>
  );
});

OfficeAddresses.propTypes = {
  map: PropTypes.shape({}),
  addresses: PropTypes.arrayOf(PropTypes.shape({})),
};

OfficeAddresses.defaultProps = {
  map: undefined,
  addresses: undefined,
};

export default OfficeAddresses;
