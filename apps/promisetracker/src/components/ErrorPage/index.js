import React from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";

import { RichTypography, Section } from "@commons-ui/core";

import H1 from "@/promisetracker/components/H1";
import ArticleCard from "@/promisetracker/components/ArticleCard";
import Page from "@/promisetracker/components/Page/Base";
import image from "@/promisetracker/assets/404@2x.png";

import useStyles from "./useStyles";

function ErrorPage({ description, items, title, ...props }) {
  const classes = useStyles(props);

  return (
    <Page {...props} title={title} classes={{ section: classes.section }}>
      <Section
        title={title}
        classes={{ root: classes.section, title: classes.sectionTitle }}
        titleProps={{ component: H1 }}
      >
        <Grid container justify="space-between" className={classes.grid}>
          <Grid item xs={12} lg={5} className={classes.gridMain}>
            <RichTypography className={classes.description}>
              {description}
            </RichTypography>
          </Grid>
          <Grid item xs={12} lg={4} className={classes.gridAside}>
            <img src={image} alt="404" className={classes.image} />
          </Grid>
        </Grid>
        {items?.length > 0 && (
          <Grid
            container
            justify="space-between"
            className={classes.gridArticles}
          >
            {items.map((article) => (
              <Grid item key={article.title} className={classes.gridArticle}>
                <ArticleCard {...article} component="div" />
              </Grid>
            ))}
          </Grid>
        )}
      </Section>
    </Page>
  );
}

ErrorPage.propTypes = {
  description: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.shape({})),
  title: PropTypes.string,
};

ErrorPage.defaultProps = {
  description: undefined,
  items: undefined,
  title: undefined,
};

export default ErrorPage;
