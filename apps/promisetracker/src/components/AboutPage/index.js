import React from "react";
import PropTypes from "prop-types";

import { RichTypography } from "@commons-ui/core";

import ActNow from "@/promisetracker/components/ActNow";
import ContentPage from "@/promisetracker/components/ContentPage";
import PromiseStatusList from "@/promisetracker/components/PromiseStatusList";

import image from "@/promisetracker/assets/abouttheproject-img.png";

import useStyles from "./useStyles";

function AboutPage({ content, criteria, description, title, ...props }) {
  const classes = useStyles(props);

  return (
    <ContentPage
      title={title}
      content={
        <>
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
        </>
      }
      aside={<img src={image} alt="About" className={classes.image} />}
      classes={{
        section: classes.section,
        sectionTitle: classes.sectionTitle,
        footer: classes.footer,
        grid: classes.grid,
        gridAside: classes.gridAside,
        gridMain: classes.gridMain,
      }}
    >
      <ActNow
        classes={{
          section: classes.section,
          root: classes.actNow,
        }}
      />
    </ContentPage>
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
