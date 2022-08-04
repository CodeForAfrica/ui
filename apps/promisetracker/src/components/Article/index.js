import { RichTypography, Section } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import { Grid, Typography, Hidden } from "@mui/material";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import PublicationInfo from "./PublicationInfo";
import Share from "./Share";
import useStyles from "./useStyles";

import facebook from "@/promisetracker/assets/share-facebook.svg?url";
import instagram from "@/promisetracker/assets/share-instagram.svg?url";
import twitter from "@/promisetracker/assets/share-twitter.svg?url";

function Article({
  article,
  breadcrumb,
  socialMedia,
  classes: classesProp,
  shareLabel,
}) {
  const classes = useStyles({ image: article.image, classes: classesProp });
  return (
    <Section classes={{ root: classes.section }}>
      <Hidden lgUp>
        <Typography className={classes.label} variant="h4">
          <Link href="/analysis/articles" className={classes.link}>
            {breadcrumb}
          </Link>
        </Typography>
      </Hidden>

      <div className={classes.featuredImageContainer} />
      <Grid container>
        <Grid item lg={7}>
          <Hidden lgDown>
            <Typography className={classes.label} variant="h4">
              <Link href="/analysis/articles" className={classes.link}>
                {breadcrumb}
              </Link>
            </Typography>
          </Hidden>

          <RichTypography className={classes.title} variant="h1">
            {article.title}
          </RichTypography>
          <RichTypography className={classes.description} variant="h3">
            {article.description}
          </RichTypography>

          <PublicationInfo {...article} />
          <RichTypography className={classes.articleBody} variant="body1">
            {article.content}
          </RichTypography>
          <div className={classes.articleFooter}>
            <PublicationInfo {...article} />
            <div className={classes.socialMediaContainer}>
              {socialMedia.map((platform) => (
                <Link
                  href={platform.url}
                  key={platform.url}
                  className={classes.socialMedia}
                >
                  <Image
                    src={platform.image.url}
                    alt={platform.image.alt}
                    width={20}
                    height={20}
                  />
                </Link>
              ))}
            </div>
          </div>
        </Grid>
        <Grid item lg={2} implementation="css" smDown component={Hidden} />

        <Grid item lg={3}>
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
    content: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
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
  breadcrumb: "Article",
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
      url: "https://twitter.com/Code4Africa?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5EShare",
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
