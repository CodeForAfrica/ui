import React from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";

import { RichTypography, Section } from "@commons-ui/core";

import ActNow from "@/promisetracker/components/ActNow";
import H1 from "@/promisetracker/components/H1";
import Page from "@/promisetracker/components/Page";
import PromiseStatusList from "@/promisetracker/components/PromiseStatusList";

import image from "@/promisetracker/assets/abouttheproject-img.png";

import useStyles from "./useStyles";

function AboutPage({ content, criteria, description, title, ...props }) {
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
            {description?.length && (
              <RichTypography className={classes.description}>
                {description}
              </RichTypography>
            )}
            {content?.length && (
              <RichTypography variant="body2" className={classes.content}>
                {content}
              </RichTypography>
            )}
            {criteria && (
              <div className={classes.criteria}>
                <RichTypography
                  component="h2"
                  variant="h5"
                  className={classes.criteriaTitle}
                >
                  {criteria.title}
                </RichTypography>
                <PromiseStatusList
                  items={criteria.items}
                  classes={{ root: classes.criteriaItems }}
                />
              </div>
            )}
          </Grid>
          <Grid item xs={12} lg={4} className={classes.gridAside}>
            <img src={image} alt="About" className={classes.image} />
          </Grid>
        </Grid>
      </Section>
      <ActNow
        classes={{
          root: classes.actNow,
          section: classes.section,
        }}
      />
    </Page>
  );
}

AboutPage.propTypes = {
  content: PropTypes.string,
  criteria: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})),
    title: PropTypes.string.isRequired,
  }),
  description: PropTypes.string,
  title: PropTypes.string,
};

AboutPage.defaultProps = {
  content: undefined,
  criteria: undefined,
  description: undefined,
  title: undefined,
};

export default AboutPage;
