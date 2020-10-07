import React from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";

import { Section } from "@commons-ui/core";

import H1 from "@/promisetracker/components/H1";
import Page from "@/promisetracker/components/Page";

import useStyles from "./useStyles";

function ContentPage({ aside, children, content, title, ...props }) {
  const classes = useStyles(props);

  return (
    <Page
      {...props}
      title={title}
      classes={{ section: classes.section, footer: classes.footer }}
    >
      <Section
        title={title}
        classes={{ root: classes.section, title: classes.sectionTitle }}
        titleProps={{ component: H1 }}
      >
        <Grid container justify="space-between" className={classes.grid}>
          <Grid item xs={12} lg={7} className={classes.gridMain}>
            {content}
          </Grid>
          {aside && (
            <Grid item xs={12} lg={4} className={classes.gridAside}>
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
  children: PropTypes.node,
  content: PropTypes.node.isRequired,
  title: PropTypes.string,
};

ContentPage.defaultProps = {
  aside: undefined,
  children: undefined,
  title: undefined,
};

export default ContentPage;
