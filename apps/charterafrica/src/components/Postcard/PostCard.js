import RichTypography from "@/commons-ui/core/RichTypography";
import { Card, CardContent, CardMedia } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef } from "react";

import { neutral } from "@/charterafrica/colors";

const PostCard = forwardRef((props, ref) => {
  const { author, date, image, title, sx } = props;

  return (
    <Card sx={sx} ref={ref}>
      <CardMedia
        image={image.url}
        title={image.filename}
        sx={{ height: 200 }}
      />
      <CardContent>
        <RichTypography
          color="neutral.dark"
          typograpy={{ md: "h5SemiBold" }}
          variant="h5SmallSemiBold"
          sx={{ mb: 5 m}}
        >
          {title}
        </RichTypography>
        <RichTypography variant="p1" color="neutral.main" sx={{ mb: 2.5 }}>
          {author}
        </RichTypography>
        <RichTypography variant="p1" color={neutral[500]}>
          {date}
        </RichTypography>
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
