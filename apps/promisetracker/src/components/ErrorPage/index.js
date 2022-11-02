import { RichTypography, Section } from "@commons-ui/core";
import { Grid, Hidden } from "@mui/material";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import defaultImage from "@/promisetracker/assets/copy-bg@2400x.png";
import H1 from "@/promisetracker/components/H1";
import LatestArticles from "@/promisetracker/components/LatestArticles";
import Page from "@/promisetracker/components/Page/Base";

/**
 * . This is essentially ContentPage for errors.
 */
function ErrorPage({
  articles,
  description,
  featuredImage,
  footer,
  navigation,
  title,
  ...props
}) {
  const classes = useStyles(props);
  const image = featuredImage || defaultImage;

  return (
    <Page
      {...props}
      footer={footer}
      navigation={navigation}
      title={title}
      classes={{ root: classes.root, section: classes.section }}
    >
      <Section classes={{ root: classes.section }}>
        <Hidden lgUp>
          <H1 className={classes.title}>{title}</H1>
        </Hidden>
        <Grid container justifyContent="space-between" className={classes.grid}>
          <Grid item xs={12} lg={5} className={classes.gridContent}>
            <Hidden lgDown>
              <H1 className={classes.title}>{title}</H1>
            </Hidden>
            <RichTypography className={classes.description}>
              {description}
            </RichTypography>
          </Grid>
          <Grid item xs={12} lg={5} className={classes.gridAside}>
            <figure className={classes.figure}>
              <Image src={image} alt="404" fill className={classes.image} />
            </figure>
          </Grid>
        </Grid>
      </Section>
      {articles?.length > 0 && (
        <div className={classes.articles}>
          <LatestArticles
            actionLabel="See All"
            items={articles}
            title="Latest Articles"
            classes={{
              section: classes.section,
              sectionTitle: classes.latestArticlesTitle,
            }}
          />
        </div>
      )}
    </Page>
  );
}

ErrorPage.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.shape({})),
  description: PropTypes.string,
  featuredImage: PropTypes.string,
  footer: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
  title: PropTypes.string,
};

ErrorPage.defaultProps = {
  articles: undefined,
  description: undefined,
  featuredImage: undefined,
  footer: undefined,
  navigation: undefined,
  title: undefined,
};

export default ErrorPage;
