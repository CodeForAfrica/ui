import { Link } from "@commons-ui/next";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  styled,
} from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef } from "react";

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

const PostCard = forwardRef((props, ref) => {
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
    ...restProps
  } = props;
  const ownerState = {
    ...restProps,
    elevation,
    square,
    variant,
    href,
  };
  return (
    <StyledCard
      elevation={elevation}
      sx={sx}
      ref={ref}
      ownerState={ownerState}
      variant={variant}
      component={href ? Link : undefined}
      href={href}
    >
      <StyledActionArea>
        <CardMedia
          image={image.url}
          title={image.filename}
          sx={{ height: 200 }}
        />
        <CardContent>
          <LineClampedRichTypography
            color="neutral.dark"
            typograpy={{ md: "h5SemiBold" }}
            variant="h5SmallSemiBold"
            textAlign="left"
            sx={{ mb: 2.5, height: 84 }}
            html={false}
            lineClamp={3}
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
