import { Card, CardContent, CardMedia } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef } from "react";

import LineClampedRichTypography from "../LineClampedRichTypography";

const PostCard = forwardRef((props, ref) => {
  const { author, date, image, title, sx } = props;

  return (
    <Card elevation={1} sx={sx} ref={ref}>
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
          sx={{ mb: 2.5 }}
          html={false}
          lineClamp={3}
        >
          {title}
        </LineClampedRichTypography>
        <LineClampedRichTypography
          variant="p1"
          color="neutral.main"
          sx={{ mb: 2.5 }}
          lineClamp={1}
        >
          {author}
        </LineClampedRichTypography>
        <LineClampedRichTypography
          lineClamp={1}
          variant="p1"
          color="neutral.main"
        >
          {date}
        </LineClampedRichTypography>
      </CardContent>
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
