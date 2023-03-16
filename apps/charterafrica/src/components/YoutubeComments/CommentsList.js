import { RichTypography } from "@commons-ui/core";
import { Box, Grid, MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";

import Comment from "./Comment";

import { neutral } from "@/charterafrica/colors";

const CommentsList = forwardRef((props, ref) => {
  const { comments } = props;
  const list = comments.map((comm, i) => ({ ...comm, id: i }));
  return (
    <Box bgcolor="#FFF" ref={ref}>
      <Grid
        sx={{ p: 2.5 }}
        alignItems="center"
        justifyContent="space-between"
        container
      >
        <Grid item>
          <RichTypography variant="p3">{list.length} comments</RichTypography>
        </Grid>
        <Grid display="flex" alignItems="center" justifyContent="flex-end" item>
          <RichTypography variant="p3">Sort by:</RichTypography>
          <Select
            defaultValue="recent"
            size="small"
            sx={() => ({
              maxWidth: 200,
              ml: 2,
              background: neutral[50],
              borderColor: neutral[400],
            })}
            fullWidth
          >
            <MenuItem value="recent">
              <RichTypography variant="p1">Most Recent</RichTypography>
            </MenuItem>
            <MenuItem value="relevance">
              <RichTypography variant="p1">Relevance</RichTypography>
            </MenuItem>
          </Select>
        </Grid>
      </Grid>
      {list.map((item) => (
        <Comment
          key={item.id}
          comments={item?.replies?.comments || []}
          {...item?.snippet?.topLevelComment?.snippet}
        />
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
