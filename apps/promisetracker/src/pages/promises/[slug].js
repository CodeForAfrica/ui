import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

import Page from "@/promisetracker/components/Page";
import Promise from "@/promisetracker/components/Promise";
import RelatedPromises from "@/promisetracker/components/Promises";
import Subscribe from "@/promisetracker/components/Newsletter";

import i18n from "@/promisetracker/lib/i18n";
import wp from "@/promisetracker/lib/wp";

import promiseImage from "@/promisetracker/assets/promise-thumb-01@2x.png";

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
      marginTop: typography.pxToRem(96),
    },
    fontWeight: 400,
    "&:after": {
      borderBottom: "none",
    },
  },
  footer: {
    marginTop: 0,
  },
}));

/**
 * see: /pages/analysis/articles/[slug]#NO_RTICLES_SLUG
 */
const NO_PROMISES_SLUG = "not_found";

function PromisePage({
  footer,
  navigation,
  promise,
  relatedPromises,
  title: titleProp,
  ...props
}) {
  const classes = useStyles(props);
  const title = promise?.title ? `${promise.title} | ${titleProp}` : titleProp;

  return (
    <Page
      {...props}
      footer={footer}
      navigation={navigation}
      title={title}
      classes={{ section: classes.section, footer: classes.footer }}
    >
      {promise ? <Promise promise={promise} /> : null}
      <RelatedPromises
        items={relatedPromises}
        title="Related Promises"
        withFilter={false}
        classes={{
          section: classes.section,
          sectionTitle: classes.sectionTitle,
        }}
      />
      <Subscribe
        classes={{
          section: classes.section,
        }}
      />
    </Page>
  );
}

PromisePage.propTypes = {
  classes: PropTypes.shape({
    section: PropTypes.string,
    sectionTitle: PropTypes.string,
  }),
  footer: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
  promise: PropTypes.shape({
    date: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
  }),
  relatedPromises: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
};

PromisePage.defaultProps = {
  classes: undefined,
  footer: undefined,
  navigation: undefined,
  promise: undefined,
  relatedPromises: Array(3)
    .fill(null)
    .map((_, i) => ({
      date: "2019-08-10",
      description: `
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              euismod odio non leo pretium pellentesque.
            `,
      image: promiseImage,
      status: {
        color: "#FFB322",
        textColor: "#202020",
        title: "delayed",
      },
      title: `Codification of national sports and athletics law ${i + 1}`,
    })),
  title: undefined,
};

export async function getStaticPaths() {
  const fallback = false;
  const page = await wp().pages({ slug: "promises" }).first;
  const posts = page.acf?.posts?.length
    ? page.acf.posts
    : [{ post_name: NO_PROMISES_SLUG }];
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
    slug !== NO_PROMISES_SLUG ? await wp().posts({ slug, locale }).first : null;
  const notFound = !post;
  if (notFound) {
    return {
      notFound,
    };
  }

  const errorCode = notFound ? 404 : null;
  const page = await wp().pages({ slug: "promises", locale }).first;
  const promise = {
    ...post,
    image: post.featured_media.source_url || null,
    description: post.content.replace(/(<([^>]+)>)/gi, "").substring(0, 200),
    date: new Date(post.date).toISOString().slice(0, 10),
    status: {
      color: "#FFB322",
      textColor: "#202020",
      title: "delayed",
    },
    attribution: {
      title: post.acf.source_attribution.title,
      description: post.acf.source_attribution.description.replace(
        /(<([^>]+)>)/gi,
        ""
      ),
    },
    narrative: post.acf.narrative,
  };
  const languageAlternates = _.languageAlternates(`/promises/${slug}`);

  return {
    props: {
      ...page,
      errorCode,
      languageAlternates,
      promise,
    },
    revalidate: 2 * 60, // seconds
  };
}

export default PromisePage;
