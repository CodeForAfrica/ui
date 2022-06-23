import { RichTypography, Section } from "@commons-ui/core";
import PropTypes from "prop-types";
import React from "react";

import ChoiceChip from "@/codeforafrica/components/ChoiceChip";
import ChoiceChipGroup from "@/codeforafrica/components/ChoiceChipGroup";
import ShareThisPage from "@/codeforafrica/components/ShareThisPage";

const ArticleHeader = React.forwardRef(function ArticleHeader(props, ref) {
  const { date, subheader, sx, tags, title } = props;

  return (
    <Section
      component="header"
      sx={{
        px: { xs: 2.5, sm: 0 },
        maxWidth: {
          sm: "648px",
          md: "912px",
        },
        ...sx,
      }}
      ref={ref}
    >
      <RichTypography
        component="div"
        variant="body2"
        sx={{ mt: { xs: 2.5, md: 7.5 } }}
      >
        {date}
      </RichTypography>
      <RichTypography
        component="div"
        variant="h1"
        sx={{ mt: { xs: 2.5, md: 5 } }}
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
      <ShareThisPage title="Share This Article" />
    </Section>
  );
});

ArticleHeader.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  subheader: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.string),
};

ArticleHeader.defaultProps = {
  title: undefined,
  date: undefined,
  tags: undefined,
  subheader: undefined,
};

export default ArticleHeader;
