import { RichTypography } from "@commons-ui/core";
import { Box } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import ChoiceChip from "@/codeforafrica/components/ChoiceChip";
import ChoiceChipGroup from "@/codeforafrica/components/ChoiceChipGroup";

const ArticleHeader = React.forwardRef(function ArticleHeader(props, ref) {
  const { title, date, subheader, tags, other } = props;

  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
      {...other}
    >
      <RichTypography
        component="div"
        variant="subtitle1"
        sx={{ py: { xs: 2.5, md: 5 } }}
      >
        {date}
      </RichTypography>
      <RichTypography
        component="div"
        variant="h1"
        sx={{ my: { xs: 2.5, md: 5 } }}
      >
        {title}
      </RichTypography>
      <RichTypography
        component="div"
        variant="body1"
        sx={{
          color: "primary.main",
          typography: { md: "subheading" },
        }}
      >
        {subheader}
      </RichTypography>
      {tags?.length > 0 ? (
        <ChoiceChipGroup color="default" sx={{ my: { xs: 2.5, md: 5 } }}>
          {tags.map((tag) => (
            <ChoiceChip label={tag} value={tag} key={tag} />
          ))}
        </ChoiceChipGroup>
      ) : null}
    </Box>
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
