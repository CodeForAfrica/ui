import { RichTypography } from "@commons-ui/core";
import clsx from "clsx";
import Image from "next/image";
import PropTypes from "prop-types";
import React from "react";

import Partners from "./Partners";
import PromiseCriteria from "./PromiseCriteria";
import useStyles from "./useStyles";

import background from "@/promisetracker/assets/copy-bg@2400x@2x.png";
import ActNow from "@/promisetracker/components/ActNow";
import ContentPage from "@/promisetracker/components/ContentPage";
import ContentSection from "@/promisetracker/components/ContentPage/Section";

function AboutPage({
  actNow,
  actNowEnabled,
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
      <figure className={classes.featuredFigure}>
        <Image
          src={featuredImage}
          layout="fill"
          alt="About"
          className={classes.featuredImage}
        />
      </figure>
    )) ||
    undefined;
  return (
    <ContentPage
      {...props}
      footer={footer}
      navigation={navigation}
      title={title}
      content={
        description?.length && (
          <RichTypography className={classes.description}>
            {description}
          </RichTypography>
        )
      }
      contentProps={{ lg: 6 }}
      aside={aside}
      asideProps={{ lg: 5 }}
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
          aside={
            <figure className={classes.contentSectionAsideBackground}>
              <Image
                src={background}
                layout="fill"
                alt="Background"
                className={classes.contentSectionAsideBackgroundImage}
              />
            </figure>
          }
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
      {actNowEnabled ? (
        <ActNow
          {...actNow}
          classes={{
            section: classes.section,
            root: classes.actNow,
          }}
        />
      ) : null}
    </ContentPage>
  );
}

AboutPage.propTypes = {
  actNow: PropTypes.shape({}),
  actNowEnabled: PropTypes.bool,
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
  actNowEnabled: undefined,
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
