import { Section } from "@commons-ui/core";
import { Link, RichTypography } from "@commons-ui/next";
import PropTypes from "prop-types";
import React from "react";

import ChoiceChip from "@/civicsignalblog/components/ChoiceChip";
import ChoiceChipGroup from "@/civicsignalblog/components/ChoiceChipGroup";
import ShareThisPage from "@/civicsignalblog/components/ShareThisPage";

const ArticleHeader = React.forwardRef(function ArticleHeader(props, ref) {
  const { date, excerpt, sx, tags, title, primaryTag } = props;

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
          mt: { xs: 2.5, md: 5 },
          typography: { md: "subheading" },
        }}
      >
        {excerpt}
      </RichTypography>
      {tags?.length > 0 ? (
        <ChoiceChipGroup color="default" sx={{ mt: { xs: 2.5, md: 5 } }}>
          {tags.map((tag) => (
            <ChoiceChip
              label={tag.name}
              value={tag.slug}
              key={tag.slug}
              component={Link}
              href={`/${primaryTag}?tag=${tag.slug}`}
            />
          ))}
        </ChoiceChipGroup>
      ) : null}
      <ShareThisPage
        title="Share This Article"
        sx={{ mt: { xs: 2.5, md: 5 } }}
      />
    </Section>
  );
});

ArticleHeader.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string,
  excerpt: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.shape({})),
};

ArticleHeader.defaultProps = {
  title: undefined,
  date: undefined,
  tags: undefined,
  excerpt: undefined,
};

export default ArticleHeader;
