import React from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";

import Promise from "@/promisetracker/components/Promise";
import RelatedPromises from "@/promisetracker/components/Promises";
import Page from "@/promisetracker/components/Page";
import Subscribe from "@/promisetracker/components/Newsletter";
import { getSitePage, getArticle } from "@/promisetracker/cms";
import config from "@/promisetracker/config";

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

function Index({ promise, relatedPromises, ...props }) {
  const classes = useStyles(props);

  return (
    <Page
      title={promise.title}
      classes={{ section: classes.section, footer: classes.footer }}
    >
      <Promise promise={promise} />
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

Index.propTypes = {
  classes: PropTypes.shape({
    section: PropTypes.string,
    sectionTitle: PropTypes.string,
  }),
  promise: PropTypes.shape({
    date: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
  }),
  relatedPromises: PropTypes.arrayOf(PropTypes.shape({})),
};

Index.defaultProps = {
  promise: undefined,
  classes: undefined,
  relatedPromises: Array(3).fill({
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
    title: "Codification of national sports and athletics law",
  }),
};

export async function getStaticPaths() {
  const fallback = false;
  const page = await getSitePage("promises");
  const contents = page.page.acf.posts;
  const paths = contents?.map((post) => ({
    params: { slug: post.post_name },
  })) ?? [{ params: { slug: "" } }];
  return { fallback, paths };
}

export async function getStaticProps({ params: { slug: slugParam } }) {
  const slug = slugParam.toLowerCase();
  const lang = config.DEFAULT_LANG;
  const page = await getSitePage("promises", lang);
  const promiseProp = await getArticle(slug, lang);
  const errorCode = promiseProp ? null : 404;
  const promise = {
    image: promiseProp.media.full.source_url,
    description: promiseProp.post.content.rendered
      .replace(/(<([^>]+)>)/gi, "")
      .substring(0, 200),
    date: new Date(promiseProp.post.date).toDateString({
      dateStyle: "short",
    }),
    title: promiseProp.post.title.rendered,
    body: promiseProp.post.content.rendered,
    author: { name: promiseProp.author.name, image: "" },
    status: {
      color: "#FFB322",
      textColor: "#202020",
      title: "delayed",
    },
    attribution: {
      title: promiseProp.post.acf.source_attribution.title,
      description: promiseProp.post.acf.source_attribution.description.replace(
        /(<([^>]+)>)/gi,
        ""
      ),
    },
    narrative: promiseProp.post.acf.narrative,
  };

  return {
    props: {
      promise,
      errorCode,
      page: page.page,
      subscribe: page.page.subscribe,
    },
  };
}

export default Index;
