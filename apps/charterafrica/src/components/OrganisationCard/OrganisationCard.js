import { Link } from "@commons-ui/next";
import { CardContent, CardMedia } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";
import Card, { StyledActionArea } from "@/charterafrica/components/StyledCard";

const OrganisationCard = React.forwardRef(function OrganisationCard(
  props,
  ref
) {
  const {
    description,
    lastActive,
    elevation,
    image,
    link,
    square,
    sx,
    name,
    variant = "outlined",
  } = props;
  const ownerState = {
    elevation,
    square,
    variant,
  };

  return (
    <Card
      elevation={elevation}
      ownerState={ownerState}
      variant={variant}
      sx={sx}
      ref={ref}
    >
      <StyledActionArea
        component={link?.href ? Link : undefined}
        href={link?.href}
      >
        <CardMedia image={image} sx={{ height: 200 }} />
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <LineClampedRichTypography
            color="neutral.dark"
            html={false}
            lineClamp={1}
            textAlign="left"
            variant="h5SmallSemiBold"
            sx={(theme) => ({
              height:
                theme.typography.h5SmallSemiBold.fontSize *
                theme.typography.h5SmallSemiBold.lineHeight,
              [theme.breakpoints.up("md")]: {
                height:
                  theme.typography.h5SemiBold.fontSize *
                  theme.typography.h5SemiBold.lineHeight,
                typography: "h5SemiBold",
              },
            })}
          >
            {name}
          </LineClampedRichTypography>
          <LineClampedRichTypography
            variant="p1"
            color="neutral.main"
            sx={(theme) => ({
              mt: 2.5,
              height: `calc(${theme.typography.p1.fontSize}px * ${theme.typography.p1.lineHeight} * 3)`,
            })}
            lineClamp={3}
          >
            {description}
          </LineClampedRichTypography>
          <LineClampedRichTypography
            color="neutral.dark"
            lineClamp={1}
            variant="p1"
            sx={{ mt: 2.5, height: 18 }}
          >
            {lastActive}
          </LineClampedRichTypography>
        </CardContent>
      </StyledActionArea>
    </Card>
  );
});

OrganisationCard.propTypes = {
  name: PropTypes.string,
  lastActive: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

OrganisationCard.defaultProps = {
  name: undefined,
  lastActive: undefined,
  description: undefined,
  image: undefined,
};

export default OrganisationCard;
