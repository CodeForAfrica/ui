import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";

import Comment from "./Comment";

const CommentsList = forwardRef((props, ref) => {
  const { comments } = props;
  const list = comments.map((comm, i) => ({ ...comm, id: i }));
  return (
    <Box bgcolor="#FFF" ref={ref}>
      {list.map((item) => (
        <Comment key={item.id} />
      ))}
    </Box>
  );
});

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({})),
};

CommentsList.defaultProps = {
  comments: [],
};

export default CommentsList;
