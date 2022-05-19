import { RichTypography, Section } from "@commons-ui/core";
import { Grid, Box, Typography, Divider } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import ArticleHeader from "@/codeforafrica/components/ArticleHeader";
import Author from "@/codeforafrica/components/Author";
import ShareBar from "@/codeforafrica/components/ShareBar";
import {
  FacebookShareBarButton,
  LinkedinShareBarButton,
  TwitterShareBarButton,
} from "@/codeforafrica/components/ShareBarButton";

const ArticlePage = React.forwardRef(function ArticlePage(props, ref) {
  const { content, children, author, ...other } = props;

  return (
    <Section sx={{ px: { xs: "20px", sm: 0 } }} {...other} ref={ref}>
      <Grid container>
        <Grid item xs={12}>
          <ArticleHeader {...props} />
          <Box
            sx={{
              color: "grey.main",
              columnGap: 2,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography variant="footerCap">Share This Article</Typography>
            <ShareBar>
              <FacebookShareBarButton />
              <LinkedinShareBarButton />
              <TwitterShareBarButton />
            </ShareBar>
          </Box>
          <RichTypography variant="body3" sx={{ my: "40px" }}>
            {content}
          </RichTypography>
          <Divider />
          <Author {...props} />
        </Grid>
      </Grid>
    </Section>
  );
});

ArticlePage.propTypes = {
  content: PropTypes.string,
  children: PropTypes.string,
};

ArticlePage.defaultProps = {
  content: undefined,
  children: undefined,
};

export default ArticlePage;
