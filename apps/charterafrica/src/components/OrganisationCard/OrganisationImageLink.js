import { RichTypography } from "@commons-ui/core";
import { Link, Figure } from "@commons-ui/next";
import { Stack } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const OrganisationImageLink = React.forwardRef(
  function OrganisationImageLink(props, ref) {
    const { avatarUrl: image, link, name } = props;

    return (
      <Link href={link.href} ref={ref} underline="none">
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
      </Link>
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
