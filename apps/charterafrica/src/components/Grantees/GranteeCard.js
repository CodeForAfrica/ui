import { Link } from "@commons-ui/next";
import {
  Button,
  CardActionArea,
  CardContent,
  CardMedia,
  styled,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";
import RichText from "@/charterafrica/components/RichText";
import Card from "@/charterafrica/components/StyledCard";

const StyledActionArea = styled(CardActionArea)`
  .MuiCardActionArea-focusHighlight {
    background: transparent;
  }
`;

const GranteeCard = React.forwardRef(function GranteeCard(props, ref) {
  const {
    description,
    image,
    name,
    sx,
    square,
    variant = "outlined",
    elevation,
    href,
    primaryLink,
    secondaryLink,
  } = props;
  const ownerState = {
    elevation,
    square,
    variant,
  };

  return (
    <Card
      elevation={elevation}
      sx={sx}
      ref={ref}
      ownerState={ownerState}
      variant={variant}
    >
      <StyledActionArea component={href ? Link : undefined} href={href}>
        <CardMedia image={image.url} sx={{ height: 264 }} />
        <CardContent>
          <LineClampedRichTypography
            color="neutral.dark"
            html={false}
            lineClamp={2}
            textAlign="left"
            variant="h5"
            sx={(theme) => ({
              mb: 2.5,
              fontWeight: 400,
              minHeight: `calc(${theme.typography.h5.fontSize}px * ${theme.typography.h5.lineHeight} * 2)`,
            })}
          >
            {name}
          </LineClampedRichTypography>
          <RichText color="neutral.dark" elements={description} lineClamp={2} />
          <Button
            component={Link}
            sx={{
              mt: 2.5,
              textTransform: "uppercase",
              fontSize: 10,
              color: "neutral.dark",
            }}
            size="small"
            variant="contained"
            color="success"
            href={primaryLink.href}
          >
            {primaryLink.label}
          </Button>
          <br />
          <Button
            component={Link}
            sx={{
              mt: 1.25,
              textTransform: "uppercase",
              fontSize: 10,
              color: "neutral.dark",
            }}
            size="small"
            variant="contained"
            color="error"
            href={secondaryLink.href}
          >
            {secondaryLink.label}
          </Button>
        </CardContent>
      </StyledActionArea>
    </Card>
  );
});

GranteeCard.propTypes = {
  name: PropTypes.string,
  description: PropTypes.arrayOf(PropTypes.shape({})),
  image: PropTypes.shape({}),
  primaryLink: PropTypes.shape({}),
  secondaryLink: PropTypes.shape({}),
};

GranteeCard.defaultProps = {
  name: undefined,
  description: undefined,
  image: undefined,
  primaryLink: undefined,
  secondaryLink: undefined,
};

export default GranteeCard;
