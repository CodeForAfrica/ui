import { Link } from "@commons-ui/next";
import { CardContent, CardMedia } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";
import Card, { StyledActionArea } from "@/charterafrica/components/StyledCard";

const ToolCard = React.forwardRef(function ToolCard(props, ref) {
  const {
    description,
    lastActive,
    elevation,
    topic,
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
              minHeight: theme.typography.h5SmallSemiBold.fontSize,
              [theme.breakpoints.up("md")]: {
                minHeight: theme.typography.h5SmallSemiBold.fontSize,
                typography: "h5SemiBold",
              },
            })}
          >
            {name}
          </LineClampedRichTypography>
          <LineClampedRichTypography
            color="neutral.dark"
            html={false}
            lineClamp={1}
            textAlign="left"
            variant="h5SmallSemiBold"
            sx={(theme) => ({
              mt: 2.5,
              minHeight: theme.typography.h5SmallSemiBold.fontSize,
              [theme.breakpoints.up("md")]: {
                minHeight: theme.typography.h5SemiBold.fontSize,
                typography: "h5SmallSemiBold",
              },
            })}
          >
            {topic}
          </LineClampedRichTypography>
          <LineClampedRichTypography
            variant="p1"
            color="neutral.dark"
            sx={(theme) => ({
              mt: 2.5,
              maxHeight: `calc(${theme.typography.p1.fontSize}px * ${theme.typography.p1.lineHeight} * 3)`,
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

ToolCard.propTypes = {
  name: PropTypes.string,
  lastActive: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  topic: PropTypes.string,
};

ToolCard.defaultProps = {
  name: undefined,
  lastActive: undefined,
  description: undefined,
  image: undefined,
  topic: undefined,
};

export default ToolCard;
