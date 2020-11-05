import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { RichTypography } from "@commons-ui/core";

import ActNow from "@/promisetracker/components/ActNow";
import ContentPage from "@/promisetracker/components/ContentPage";
import ContentSection from "@/promisetracker/components/ContentPage/Section";

import Partners from "./Partners";
import PromiseCriteria from "./PromiseCriteria";
import useStyles from "./useStyles";

function AboutPage({
  actNow,
  content,
  criteria,
  description,
  featuredImage,
  footer,
  navigation,
  partners,
  title,
  ...props
}) {
  const classes = useStyles(props);
  const aside =
    (featuredImage?.length && (
      <img src={featuredImage} alt="About" className={classes.featuredImage} />
    )) ||
    undefined;

  return (
    <ContentPage
      {...props}
      footer={footer}
      navigation={navigation}
      title={title}
      content={
        <>
          {description?.length && (
            <RichTypography className={classes.description}>
              {description}
            </RichTypography>
          )}
        </>
      }
      aside={aside}
      classes={{
        section: classes.section,
        sectionTitle: classes.sectionTitle,
        footer: classes.footer,
        grid: classes.grid,
        gridAside: classes.gridAside,
        gridContent: classes.gridContent,
      }}
    >
      <div className={classes.contentSection}>
        <ContentSection
          content={
            <>
              <Partners {...partners} />
              <PromiseCriteria {...criteria} />
              {content?.length > 0 && (
                <RichTypography variant="body2" className={classes.content}>
                  {content}
                </RichTypography>
              )}
            </>
          }
          classes={{
            section: classes.section,
            grid: clsx(classes.grid, classes.contentSectionGrid),
            gridAside: classes.gridAside,
            gridContent: classes.gridContent,
          }}
        />
      </div>
      <ActNow
        {...actNow}
        classes={{
          section: classes.section,
          root: classes.actNow,
        }}
      />
    </ContentPage>
  );
}

AboutPage.propTypes = {
  actNow: PropTypes.shape({}),
  content: PropTypes.string,
  criteria: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})),
    title: PropTypes.string.isRequired,
  }),
  description: PropTypes.string,
  featuredImage: PropTypes.string,
  footer: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
  partners: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  title: PropTypes.string,
};

AboutPage.defaultProps = {
  actNow: undefined,
  content: undefined,
  criteria: undefined,
  description: undefined,
  featuredImage: undefined,
  footer: undefined,
  navigation: undefined,
  partners: undefined,
  title: undefined,
};

export default AboutPage;
