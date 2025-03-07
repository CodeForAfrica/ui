import makeStyles from "@mui/styles/makeStyles";
import PropTypes from "prop-types";
import React from "react";
import readingTime from "reading-time";

import Article from "@/promisetracker/components/Article";
import RelatedArticles from "@/promisetracker/components/LatestArticles";
import Subscribe from "@/promisetracker/components/Newsletter";
import Page from "@/promisetracker/components/Page";
import backendFn from "@/promisetracker/lib/backend";
import i18n from "@/promisetracker/lib/i18n";
import wp from "@/promisetracker/lib/wp";
import { formatDate } from "@/promisetracker/utils";

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
  subscribe: {
    marginTop: typography.pxToRem(53),
    [breakpoints.up("lg")]: {
      marginTop: typography.pxToRem(28),
    },
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
          root: classes.subscribe,
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

export async function getStaticPaths() {
  const fallback = true;
  const page = await wp().pages({ slug: "analysis-articles" }).first;
  const posts = page.acf?.posts?.length
    ? page.acf.posts
    : [{ slug: NO_ARTICLES_SLUG }];
  const unlocalizedPaths = posts.map((post) => ({
    params: { slug: post.slug },
  }));
  const paths = i18n().localizePaths(unlocalizedPaths);

  return { fallback, paths };
}

export async function getStaticProps({
  params: { slug: slugParam },
  locale,
  preview = false,
  previewData,
}) {
  const _ = i18n();
  if (!_.locales.includes(locale)) {
    return {
      notFound: true,
    };
  }

  const slug = slugParam.toLowerCase();
  const wpApi = wp();
  let post;
  if (preview && previewData) {
    post = await wpApi.revisions(previewData.query).post;
  } else {
    post =
      slug !== NO_ARTICLES_SLUG
        ? await wpApi.posts({ slug, locale }).first
        : null;
  }

  const notFound = !post;
  if (notFound && preview) {
    return {
      redirect: {
        permanent: false,
        destination: "/preview-error",
      },
    };
  }
  if (notFound) {
    return {
      notFound,
    };
  }

  const errorCode = notFound ? 404 : null;
  const backend = backendFn();
  const { navigation } = await backend.sites().current;
  const page = await wpApi.pages({ slug: "analysis-articles" }).first;
  const posts = await wpApi.pages({ page }).posts;
  page.posts = null;
  const articles = posts?.slice(0, 4);
  const relatedArticles =
    articles?.filter((article) => article.slug !== slug) || [];
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
      navigation,
      relatedArticles,
    },
    revalidate: 2 * 60, // seconds
  };
}

export default Index;
