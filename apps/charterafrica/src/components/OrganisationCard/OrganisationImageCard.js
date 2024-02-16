import { RichTypography } from "@commons-ui/core";
import { Link, Figure } from "@commons-ui/next";
import { Grid } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

const OrganisationImageCard = React.forwardRef(
  function OrganisationImageCard(props, ref) {
    const { avatarUrl: image, link, name } = props;

    return (
      <Link href={link.href} ref={ref} underline="none">
        <Grid gap={1.2} container direction="column">
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
        </Grid>
      </Link>
    );
  },
);

OrganisationImageCard.propTypes = {
  name: PropTypes.string,
  avatarUrl: PropTypes.string,
};

OrganisationImageCard.defaultProps = {
  name: undefined,
  avatarUrl: undefined,
};

export default OrganisationImageCard;
