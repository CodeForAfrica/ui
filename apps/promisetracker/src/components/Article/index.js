import React from "react";
import PropTypes from "prop-types";

import { Grid, Typography, Hidden } from "@material-ui/core";
import { A, RichTypography } from "@commons-ui/core";

import Link from "@/promisetracker/components/Link";
import Section from "@commons-ui/core/Section";

import facebook from "@/promisetracker/assets/share-facebook.svg";
import instagram from "@/promisetracker/assets/share-instagram.svg";
import twitter from "@/promisetracker/assets/share-twitter.svg";
import Share from "./Share";
import PublicationInfo from "./PublicationInfo";

import useStyles from "./useStyles";

function Article({
  article,
  articleLabel,
  breadcrumb,
  socialMedia,
  classes: classesProp,
  shareLabel,
}) {
  const classes = useStyles({ image: article.image, classes: classesProp });
  return (
    <Section classes={{ root: classes.section }}>
      <Hidden lgUp>
        <Link
          href="/analysis/articles"
          as="/analysis/articles"
          className={classes.link}
        >
          <Typography className={classes.label} variant="h4">
            {breadcrumb}
          </Typography>
        </Link>
      </Hidden>

      <div className={classes.featuredImageContainer} />
      <Grid container>
        <Grid item md={7}>
          <Typography className={classes.label} variant="h4">
            {articleLabel}
          </Typography>

          <RichTypography className={classes.title} variant="h1">
            {article.title}
          </RichTypography>
          <RichTypography className={classes.description} variant="h3">
            {article.description}
          </RichTypography>

          <PublicationInfo />
          <RichTypography className={classes.articleBody} variant="body1">
            {article.body}
          </RichTypography>
          <div className={classes.articleFooter}>
            <PublicationInfo />
            <div className={classes.socialMediaContainer}>
              {socialMedia.map((platform) => (
                <A
                  href={platform.url}
                  key={platform.url}
                  className={classes.socialMedia}
                >
                  <img src={platform.image.url} alt={platform.image.alt} />
                </A>
              ))}
            </div>
          </div>
        </Grid>
        <Grid item md={2} implementation="css" smDown component={Hidden} />

        <Grid item md={3}>
          <Typography className={classes.label} variant="h5">
            {shareLabel}
          </Typography>
          <Share />
        </Grid>
      </Grid>
    </Section>
  );
}

Article.propTypes = {
  article: PropTypes.shape({
    body: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  articleLabel: PropTypes.string,
  breadcrumb: PropTypes.string,
  classes: PropTypes.shape({
    articleBody: PropTypes.string,
    articleFooter: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    descriptionContainer: PropTypes.string,
    featuredImageContainer: PropTypes.string,
    link: PropTypes.string,
    root: PropTypes.string,
    socialMedia: PropTypes.string,
    socialMediaContainer: PropTypes.string,
    section: PropTypes.string,
    label: PropTypes.string,
    title: PropTypes.string,
  }),
  shareLabel: PropTypes.string,
  socialMedia: PropTypes.arrayOf(PropTypes.shape({})),
};

Article.defaultProps = {
  articleLabel: "Article",
  breadcrumb: "Articles",
  classes: undefined,
  shareLabel: "Share:",
  socialMedia: [
    {
      url: "https://github.com/codeforafrica",
      image: {
        url: instagram,
        alt: "",
      },
    },

    {
      url:
        "https://twitter.com/Code4Africa?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5EShare",
      image: {
        url: twitter,
        alt: "",
      },
    },
    {
      url: "https://www.facebook.com/CodeForAfrica/",
      image: {
        url: facebook,
        alt: "",
      },
    },
  ],
};

export default Article;
