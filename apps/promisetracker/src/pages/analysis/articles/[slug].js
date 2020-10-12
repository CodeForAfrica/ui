import React from "react";
import PropTypes from "prop-types";
import readingTime from "reading-time";

import { makeStyles } from "@material-ui/core/styles";

import Article from "@/promisetracker/components/Article";
import Page from "@/promisetracker/components/Page";
import Subscribe from "@/promisetracker/components/Newsletter";
import RelatedArticles from "@/promisetracker/components/Articles";

import { getArticle, getSitePage } from "@/promisetracker/cms";
import config from "@/promisetracker/config";
import articleThumbnail from "@/promisetracker/assets/article-thumb-01.png";

const useStyles = makeStyles(({ breakpoints, typography, widths }) => ({
  section: {
    padding: `0 ${typography.pxToRem(23)}`,
    margin: 0,
    width: "100%",
    [breakpoints.up("lg")]: {
      padding: 0,
      margin: "0 auto",
      width: typography.pxToRem(widths.values.lg),
    },
  },
  sectionTitle: {
    marginBottom: typography.pxToRem(21),
    marginTop: typography.pxToRem(46),
    [breakpoints.up("lg")]: {
      marginBottom: 0,
      marginTop: typography.pxToRem(96),
    },
  },
  footer: {
    marginTop: 0,
  },
}));

function Index({ article, page, relatedArticles, subscribe, ...props }) {
  const classes = useStyles(props);

  return (
    <Page
      page={page}
      title={article.title}
      classes={{ section: classes.section }}
    >
      <Article article={article} />
      <RelatedArticles
        items={relatedArticles}
        title="Related Articles"
        classes={{
          section: classes.section,
          sectionTitle: classes.sectionTitle,
        }}
      />
      <Subscribe
        {...subscribe}
        classes={{
          section: classes.section,
        }}
      />
    </Page>
  );
}

Index.propTypes = {
  classes: PropTypes.shape({
    section: PropTypes.string,
    sectionTitle: PropTypes.string,
  }),
  article: PropTypes.shape({
    date: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
  }),
  page: PropTypes.shape({}),
  subscribe: PropTypes.shape({}),
  relatedArticles: PropTypes.arrayOf(PropTypes.shape({})),
};

Index.defaultProps = {
  article: undefined,
  classes: undefined,
  relatedArticles: Array(3).fill({
    date: "2019-08-10",
    description: `
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              euismod odio non leo pretium pellentesque.
            `,
    image: articleThumbnail,
    title: "Codification of national sports and athletics law",
  }),
  page: undefined,
  subscribe: undefined,
};

export async function getStaticPaths() {
  const fallback = false;
  const page = await getSitePage("analysis-articles");
  const contents = page.page.acf.posts;
  const paths = contents?.map((post) => ({
    params: { slug: post.post_name },
  })) ?? [{ params: { slug: "" } }];

  return { fallback, paths };
}

export async function getStaticProps({ params: { slug: slugParam } }) {
  const slug = slugParam.toLowerCase();
  const lang = config.DEFAULT_LANG;
  const page = await getSitePage("analysis-articles", lang);
  const articleProp = await getArticle(slug, lang);
  const errorCode = articleProp ? null : 404;
  const article = {
    image: articleProp.media.full.source_url,
    description: articleProp.post.content.rendered
      .replace(/(<([^>]+)>)/gi, "")
      .substring(0, 200),
    date: new Date(articleProp.post.date).toDateString({
      dateStyle: "short",
    }),
    title: articleProp.post.title.rendered,
    body: articleProp.post.content.rendered,
    author: { name: articleProp.author.name, image: "" },
    readTime: readingTime(articleProp.post.content.rendered).text,
  };
  return {
    props: {
      article,
      errorCode,
      page: page.page,
      subscribe: page.page.subscribe,
    },
  };
}

export default Index;
