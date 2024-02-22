import { RichTypography } from "@commons-ui/core";
import { Link, Figure } from "@commons-ui/next";
import { Button, Stack } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const OrganisationImageLink = React.forwardRef(
  function OrganisationImageLink(props, ref) {
    const { avatarUrl: image, link, name } = props;

    return (
      <Button
        component={link.href ? Link : undefined}
        href={link.href}
        ref={ref}
        underline="none"
        sx={{ padding: 0 }}
      >
        <Stack spacing={1.2}>
          <Figure
            sx={{
              height: "46px",
              width: "112px",
            }}
            ImageProps={{
              alt: name,
              src: image,
              sx: {
                objectPosition: "center",
                mixBlendMode: "luminosity",
              },
            }}
          />
          <RichTypography
            variant="p3SemiBold"
            sx={{
              color: "text.primary",
            }}
          >
            {name}
          </RichTypography>
        </Stack>
      </Button>
    );
  },
);

OrganisationImageLink.propTypes = {
  name: PropTypes.string,
  avatarUrl: PropTypes.string,
};

OrganisationImageLink.defaultProps = {
  name: undefined,
  avatarUrl: undefined,
};

export default OrganisationImageLink;
