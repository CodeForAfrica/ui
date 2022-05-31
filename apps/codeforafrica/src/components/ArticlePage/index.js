import { RichTypography, Section } from "@commons-ui/core";
import { Box, Typography, Divider } from "@mui/material";
import Image from "next/image";
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
  const { content, coverImage, children, author, ...other } = props;

  return (
    <Box ref={ref} {...other}>
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "163px", md: "600px" },
        }}
      >
        <Image
          alt="article-title"
          src={coverImage}
          layout="fill"
          objectFit="cover"
        />
      </Box>
      <Section
        sx={{
          px: { xs: "20px", sm: 0 },
          maxWidth: {
            sm: "648px",
            md: "912px",
          },
        }}
        ref={ref}
        {...other}
      >
        <ArticleHeader {...props} />
        <Box
          sx={{
            color: "grey.main",
            columnGap: 2,
            display: "flex",
            alignItems: "center",
            py: "20px",
          }}
        >
          <Typography variant="footerCap">Share This Article</Typography>
          <ShareBar>
            <FacebookShareBarButton />
            <LinkedinShareBarButton />
            <TwitterShareBarButton />
          </ShareBar>
        </Box>
        <RichTypography variant="body3" sx={{ my: { xs: 2.5, md: 5 } }}>
          {content}
        </RichTypography>
        <Divider />
        <Author {...props} />
      </Section>
    </Box>
  );
});

ArticlePage.propTypes = {
  content: PropTypes.string,
  children: PropTypes.string,
  coverImage: PropTypes.string,
};

ArticlePage.defaultProps = {
  content: undefined,
  children: undefined,
  coverImage: undefined,
};

export default ArticlePage;
