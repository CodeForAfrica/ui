import React from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";

import { Section } from "@commons-ui/core";

import H1 from "@/promisetracker/components/H1";
import Page from "@/promisetracker/components/Page";

import useStyles from "./useStyles";

/**
 * ContentPage is used to render related pages usually from CMS.
 *
 * Presence of `slug` is used by `ContentPage` to indicate a page has changed.
 * For example, from `/about/methodology` with slug `methodology` to
 * `/about/partners` with slug `partners`
 */
function ContentPage({
  aside,
  asideProps,
  children,
  content,
  contentProps,
  slug,
  title,
  ...props
}) {
  const classes = useStyles(props);

  return (
    <Page
      {...props}
      key={slug}
      title={title}
      classes={{
        root: classes.root,
        section: classes.section,
        footer: classes.footer,
      }}
    >
      <Section
        title={title}
        titleProps={{ component: H1 }}
        classes={{ root: classes.section, title: classes.sectionTitle }}
      >
        <Grid container justify="space-between" className={classes.grid}>
          <Grid
            item
            xs={12}
            lg={7}
            {...contentProps}
            className={classes.gridContent}
          >
            {content}
          </Grid>
          {aside && (
            <Grid
              item
              xs={12}
              lg={4}
              {...asideProps}
              className={classes.gridAside}
            >
              {aside}
            </Grid>
          )}
        </Grid>
      </Section>
      {children}
    </Page>
  );
}

ContentPage.propTypes = {
  aside: PropTypes.node,
  asideProps: PropTypes.shape({}),
  children: PropTypes.node,
  content: PropTypes.node.isRequired,
  contentProps: PropTypes.shape({}),
  slug: PropTypes.string,
  title: PropTypes.string,
};

ContentPage.defaultProps = {
  aside: undefined,
  asideProps: undefined,
  children: undefined,
  contentProps: undefined,
  slug: undefined,
  title: undefined,
};

export default ContentPage;
