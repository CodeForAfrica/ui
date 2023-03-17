import { Link } from "@commons-ui/next";
import { CardContent, CardMedia } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";
import RichText from "@/charterafrica/components/RichText";
import Card, { StyledActionArea } from "@/charterafrica/components/StyledCard";

const PostCard = React.forwardRef(function PostCard(props, ref) {
  const {
    author,
    date,
    elevation,
    excerpt,
    image,
    link,
    square,
    sx,
    title,
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
      sx={sx}
      ref={ref}
      ownerState={ownerState}
      variant={variant}
    >
      <StyledActionArea
        component={link?.href ? Link : undefined}
        href={link?.href}
      >
        <CardMedia image={image?.url} sx={{ height: 200 }} />
        <CardContent>
          <LineClampedRichTypography
            color="neutral.dark"
            html={false}
            lineClamp={3}
            textAlign="left"
            variant="h5SmallSemiBold"
            sx={(theme) => ({
              minHeight: `calc(${theme.typography.h5SmallSemiBold.fontSize}px * ${theme.typography.h5SmallSemiBold.lineHeight} * 3)`,
              [theme.breakpoints.up("md")]: {
                minHeight: `calc(${theme.typography.h5SemiBold.fontSize}px * ${theme.typography.h5SemiBold.lineHeight} * 3)`,
                typography: "h5SemiBold",
              },
            })}
          >
            {title}
          </LineClampedRichTypography>
          <RichText
            color="neutral.dark"
            elements={excerpt}
            lineClamp={3}
            textAlign="left"
            variant="p1"
            sx={(theme) => ({
              mt: 2.5,
              maxHeight: `calc(${theme.typography.p1.fontSize}px * ${theme.typography.p1.lineHeight} * 3)`,
            })}
          />
          <LineClampedRichTypography
            variant="p1"
            color="neutral.main"
            sx={{ mt: 2.5, height: 18 }}
            lineClamp={1}
          >
            {author}
          </LineClampedRichTypography>
          <LineClampedRichTypography
            color="neutral.main"
            lineClamp={1}
            variant="p1"
            sx={{ mt: 2.5, height: 18 }}
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
