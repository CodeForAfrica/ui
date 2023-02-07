import { Link } from "@commons-ui/next";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  styled,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import LineClampedRichTypography from "../LineClampedRichTypography";

import { neutral } from "@/charterafrica/colors";

const StyledCard = styled(Card)(({ ownerState, theme }) => ({
  backgroundColor: "#fff",
  transition: theme.transitions.create(["filter", "border-color"]),
  width: "100%",
  "&:hover": {
    ...(ownerState.variant === "outlined" && {
      borderColor: neutral[700],
      filter: "drop-shadow(0px 12px 24px rgba(0, 0, 0, 0.1))",
      backgroundColor: "#fff",
    }),
  },
  ...(ownerState.variant === "outlined" && {
    border: `2px solid transparent`,
    borderRadius: 5,
    filter: "drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.1))",
    "& .MuiCardActionArea": {
      border: `2px solid transparent`,
    },
  }),
}));

const StyledActionArea = styled(CardActionArea)(
  () => `
.MuiCardActionArea-focusHighlight {
    background: transparent;
}
`
);

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
    href,
  } = props;
  const ownerState = {
    elevation,
    square,
    variant,
  };

  return (
    <StyledCard
      elevation={elevation}
      sx={sx}
      ref={ref}
      ownerState={ownerState}
      variant={variant}
    >
      <StyledActionArea component={href ? Link : undefined} href={href}>
        <CardMedia
          image={image.url}
          title={image.filename}
          sx={{ height: 200 }}
        />
        <CardContent>
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
    </StyledCard>
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
