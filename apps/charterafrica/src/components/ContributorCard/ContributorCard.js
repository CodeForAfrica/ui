import { Link } from "@commons-ui/next";
import { Box, CardMedia, CardContent } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";
import Card, { StyledActionArea } from "@/charterafrica/components/StyledCard";

const ContributorCard = React.forwardRef(function ContributorCard(props, ref) {
  const {
    description,
    elevation,
    link,
    square,
    sx,
    name,
    image,
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
        <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>
          <CardMedia
            component="img"
            image={image}
            sx={{
              width: 250,
              height: 250,
              borderRadius: "50%",
            }}
          />
        </Box>
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
            lineClamp={2}
            textAlign="center"
            variant="h5SmallSemiBold"
            sx={(theme) => ({
              [theme.breakpoints.up("md")]: {
                height: `calc(${
                  theme.typography.h5SemiBold.fontSize *
                  theme.typography.h5SemiBold.lineHeight
                }px * 2)`,
                color: theme.typography.h5SemiBold.fontSize,
                typography: "h5SemiBold",
              },
            })}
          >
            {name}
          </LineClampedRichTypography>
          <LineClampedRichTypography
            variant="p1"
            color="neutral.main"
            textAlign="center"
            sx={(theme) => ({
              mt: 2.5,
              height: `calc(${theme.typography.p1.fontSize}px * ${theme.typography.p1.lineHeight} * 3)`,
            })}
            lineClamp={3}
          >
            {description}
          </LineClampedRichTypography>
        </CardContent>
      </StyledActionArea>
    </Card>
  );
});

ContributorCard.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

ContributorCard.defaultProps = {
  name: undefined,
  description: undefined,
  image: undefined,
};

export default ContributorCard;
