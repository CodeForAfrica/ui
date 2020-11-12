import React from "react";
import PropTypes from "prop-types";
import readingTime from "reading-time";

import { makeStyles } from "@material-ui/core/styles";

import Article from "@/promisetracker/components/Article";
import Page from "@/promisetracker/components/Page";
import Subscribe from "@/promisetracker/components/Newsletter";
import RelatedArticles from "@/promisetracker/components/Articles";

import i18n from "@/promisetracker/lib/i18n";
import wp from "@/promisetracker/lib/wp";
import { formatDate } from "@/promisetracker/utils";

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

/**
 * Since we wnat /analysis/articles to be different from /analysis/articles/[slug],
 * we need to make sure [slug] doesn't return "" from getStaticPaths.
 */
const NO_ARTICLES_SLUG = "not_found";

function Index({
  article,
  footer,
  navigation,
  relatedArticles,
  subscribe,
  title: titleProp,
  ...props
}) {
  const classes = useStyles(props);
  const title = article?.title ? `${article.title} | ${titleProp}` : titleProp;

  return (
    <Page
      {...props}
      footer={footer}
      navigation={navigation}
      title={title}
      classes={{ section: classes.section, footer: classes.footer }}
    >
      {article ? <Article article={article} /> : null}
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
  footer: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
  subscribe: PropTypes.shape({}),
  relatedArticles: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
};

Index.defaultProps = {
  article: undefined,
  classes: undefined,
  footer: undefined,
  navigation: undefined,
  relatedArticles: Array(3)
    .fill(null)
    .map((_, i) => ({
      date: "2019-08-10",
      description: `
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              euismod odio non leo pretium pellentesque.
            `,
      image: articleThumbnail,
      title: `Codification of national sports and athletics law ${i + 1}`,
    })),
  subscribe: undefined,
  title: undefined,
};

export async function getStaticPaths() {
  const fallback = false;
  const page = await wp().pages({ slug: "analysis-articles" }).first;
  const posts = page.acf?.posts?.length
    ? page.acf.posts
    : [{ post_name: NO_ARTICLES_SLUG }];
  const unlocalizedPaths = posts.map((post) => ({
    params: { slug: post.post_name },
  }));
  const paths = i18n().localizePaths(unlocalizedPaths);

  return { fallback, paths };
}

export async function getStaticProps({ params: { slug: slugParam }, locale }) {
  const _ = i18n();
  if (!_.locales.includes(locale)) {
    return {
      notFound: true,
    };
  }

  const slug = slugParam.toLowerCase();
  const post =
    slug !== NO_ARTICLES_SLUG ? await wp().posts({ slug, locale }).first : null;
  const notFound = !post;
  if (notFound) {
    return {
      notFound,
    };
  }

  const errorCode = notFound ? 404 : null;
  const page = await wp().pages({ slug: "analysis-articles" }).first;
  const article = {
    ...post,
    image: post.featured_media.source_url,
    description: post.content.replace(/(<([^>]+)>)/gi, "").substring(0, 200),
    date: formatDate(post.date),
    readTime: readingTime(post.content).text,
  };
  const languageAlternates = _.languageAlternates(`/analysis/articles/${slug}`);

  return {
    props: {
      ...page,
      article,
      errorCode,
      languageAlternates,
    },
    revalidate: 2 * 60, // seconds
  };
}

export default Index;
