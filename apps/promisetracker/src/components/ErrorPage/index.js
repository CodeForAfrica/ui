import React from "react";
import PropTypes from "prop-types";

import { Grid, Hidden } from "@material-ui/core";

import { RichTypography, Section } from "@commons-ui/core";

import H1 from "@/promisetracker/components/H1";
import ArticleCard from "@/promisetracker/components/ArticleCard";
import Page from "@/promisetracker/components/Page/Base";
import image from "@/promisetracker/assets/illo-404@2x.png";

import useStyles from "./useStyles";

/**
 * . This is essentially ContentPage for errors.
 */
function ErrorPage({
  description,
  footer,
  articles,
  navigation,
  title,
  ...props
}) {
  const classes = useStyles(props);

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
        <Grid container justify="space-between" className={classes.grid}>
          <Grid item xs={12} lg={5} className={classes.gridContent}>
            <Hidden mdDown>
              <H1 className={classes.title}>{title}</H1>
            </Hidden>
            <RichTypography className={classes.description}>
              {description}
            </RichTypography>
          </Grid>
          <Grid item xs={12} lg={5} className={classes.gridAside}>
            <img src={image} alt="404" className={classes.image} />
          </Grid>
        </Grid>
      </Section>
      {articles?.length > 0 && (
        <div className={classes.articles}>
          <Section
            classes={{ root: classes.section }}
            titleProps={{ component: H1 }}
          >
            <Grid
              container
              justify="space-between"
              className={classes.gridArticles}
            >
              {articles.map((article) => (
                <Grid item key={article.title} className={classes.gridArticle}>
                  <ArticleCard {...article} component="div" />
                </Grid>
              ))}
            </Grid>
          </Section>
        </div>
      )}
    </Page>
  );
}

ErrorPage.propTypes = {
  description: PropTypes.string,
  footer: PropTypes.shape({}),
  articles: PropTypes.arrayOf(PropTypes.shape({})),
  navigation: PropTypes.shape({}),
  title: PropTypes.string,
};

ErrorPage.defaultProps = {
  description: undefined,
  footer: undefined,
  articles: undefined,
  navigation: undefined,
  title: undefined,
};

export default ErrorPage;
