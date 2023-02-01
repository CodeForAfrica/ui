import RichTypography from "@/commons-ui/core/RichTypography";
import { Card, CardContent, CardMedia } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef } from "react";

import { neutral } from "@/charterafrica/colors";

const PostCard = forwardRef((props, ref) => {
  const { author, date, title, image } = props;
  return (
    <Card ref={ref}>
      <CardMedia
        image={image.url}
        title={image.filename}
        sx={{ height: 200 }}
      />
      <CardContent>
        <RichTypography
          variant="h5SemiBold"
          color="neutral.dark"
          sx={{ mb: 5 }}
        >
          {title}
        </RichTypography>
        <RichTypography variant="p1" color={neutral[500]} sx={{ mb: 5 }}>
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
  title: "",
  date: "",
  author: "",
  image: {},
};

export default PostCard;
