import { Section } from "@commons-ui/core";
import { RichTypography } from "@commons-ui/next";
import PropTypes from "prop-types";
import React from "react";

import ShareThisPage from "@/codeforafrica/components/ShareThisPage";

const ArticleHeader = React.forwardRef(function ArticleHeader(props, ref) {
  const { date, excerpt, sx, title } = props;

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
        component="h1"
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
};

export default ArticleHeader;
