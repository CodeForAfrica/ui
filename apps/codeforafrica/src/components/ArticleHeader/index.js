import { Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import ChoiceChip from "@/codeforafrica/components/ChoiceChip";
import ChoiceChipGroup from "@/codeforafrica/components/ChoiceChipGroup";

const ArticleHeader = React.forwardRef(function ArticleHeader(props, ref) {
  const { title, author, date, subheader, tags, ...other } = props;

  return (
    <Grid container direction="column" ref={ref} {...other}>
      <Grid item xs={12} />
      {date && (
        <Typography component="div" variant="subtitle1" sx={{ py: 5 }}>
          {date}
        </Typography>
      )}

      {title && (
        <Typography component="div" variant="h1" sx={{ my: "40px" }}>
          {title}
        </Typography>
      )}
      {subheader && (
        <Typography
          component="div"
          variant="subheading"
          sx={{ color: "#1020E1" }}
        >
          {subheader}
        </Typography>
      )}
      {tags?.length > 0 ? (
        <ChoiceChipGroup color="default" sx={{ my: 5 }}>
          {tags.map((tag) => (
            <ChoiceChip label={tag} value={tag} key={tag} />
          ))}
        </ChoiceChipGroup>
      ) : null}
    </Grid>
  );
});

ArticleHeader.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  subheader: PropTypes.string,
  tags: PropTypes.arrayOf(),
};

ArticleHeader.defaultProps = {
  title: undefined,
  date: undefined,
  tags: undefined,
  subheader: undefined,
};

export default ArticleHeader;
