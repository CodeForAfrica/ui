import { RichTypography } from "@commons-ui/core";
import { Box, Grid, MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";

import Comment from "./Comment";

import { neutral } from "@/charterafrica/colors";

const Comments = forwardRef((props, ref) => {
  const {
    comments,
    config: { commentsLabel, mostRecentText, relevanceText, sortByText },
  } = props;

  if (!comments?.length) {
    return null;
  }

  return (
    <Box bgcolor="common.white" ref={ref}>
      <Grid
        sx={{ p: 2.5 }}
        alignItems="center"
        justifyContent="space-between"
        container
      >
        <Grid item>
          <RichTypography variant="p3">
            {comments.length} {commentsLabel}
          </RichTypography>
        </Grid>
        <Grid
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
          flex={1}
          item
        >
          <RichTypography variant="p3">{sortByText}:</RichTypography>
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
              <RichTypography variant="p1">{mostRecentText}</RichTypography>
            </MenuItem>
            <MenuItem value="relevance">
              <RichTypography variant="p1">{relevanceText}</RichTypography>
            </MenuItem>
          </Select>
        </Grid>
      </Grid>
      {comments.map((item) => (
        <Comment key={item.id} {...item} />
      ))}
    </Box>
  );
});

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({})),
  config: PropTypes.shape({
    mostRecentText: PropTypes.string.isRequired,
    relevanceText: PropTypes.string.isRequired,
    sortByText: PropTypes.string.isRequired,
    commentsLabel: PropTypes.string.isRequired,
  }),
};

Comments.defaultProps = {
  comments: undefined,
  config: {},
};

export default Comments;
