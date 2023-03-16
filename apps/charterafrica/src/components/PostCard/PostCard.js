import { Link } from "@commons-ui/next";
import { CardContent, CardMedia } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import LineClampedRichTypography from "../LineClampedRichTypography";

import Card, { StyledActionArea } from "@/charterafrica/components/StyledCard";

const PostCard = React.forwardRef(function PostCard(props, ref) {
  const {
    author,
    date,
    image,
    title,
    sx,
    square,
    variant = "outlined",
    elevation,
    link,
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
        <CardMedia image={image?.url} sx={{ height: 200 }} />
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
            lineClamp={3}
            textAlign="left"
            variant="h5SmallSemiBold"
            sx={(theme) => ({
              mb: 2.5,
              minHeight: `calc(${theme.typography.h5SmallSemiBold.fontSize}px * ${theme.typography.h5SmallSemiBold.lineHeight} * 3)`,
              [theme.breakpoints.up("md")]: {
                minHeight: `calc(${theme.typography.h5SemiBold.fontSize}px * ${theme.typography.h5SemiBold.lineHeight} * 3)`,
                typography: "h5SemiBold",
              },
            })}
          >
            {title}
          </LineClampedRichTypography>
          <LineClampedRichTypography
            variant="p1"
            color="neutral.main"
            sx={{ mb: 2.5, height: 18 }}
            lineClamp={1}
          >
            {author}
          </LineClampedRichTypography>
          <LineClampedRichTypography
            color="neutral.main"
            lineClamp={1}
            variant="p1"
            sx={{ mb: 2.5, height: 18 }}
          >
            {date}
          </LineClampedRichTypography>
        </CardContent>
      </StyledActionArea>
    </Card>
  );
});

PostCard.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  author: PropTypes.string,
  image: PropTypes.shape({}),
};

PostCard.defaultProps = {
  title: undefined,
  date: undefined,
  author: undefined,
  image: undefined,
};

export default PostCard;
