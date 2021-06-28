import PropTypes from "prop-types";
import React from "react";

import Section from "./Section";
import useStyles from "./useStyles";

import H1 from "@/promisetracker/components/H1";
import Page from "@/promisetracker/components/Page";

/**
 * ContentPage is used to render "site" pages such as about, usually with
 * content coming from a CMS.
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
  footer,
  navigation,
  showTitle,
  slug,
  title,
  ...props
}) {
  const classes = useStyles({ ...props, slug });

  return (
    <Page
      {...props}
      key={slug}
      footer={footer}
      navigation={navigation}
      title={title}
      classes={{
        root: classes.root,
        section: classes.section,
        footer: classes.footer,
      }}
    >
      <Section
        aside={aside}
        asideProps={asideProps}
        content={content}
        contentProps={contentProps}
        title={showTitle ? title : undefined}
        titleProps={{ component: H1 }}
        classes={{
          section: classes.section,
          sectionTitle: classes.sectionTitle,
          grid: classes.grid,
          gridAside: classes.gridAside,
          gridContent: classes.gridContent,
        }}
      />
      {children}
    </Page>
  );
}

ContentPage.propTypes = {
  aside: PropTypes.node,
  asideProps: PropTypes.shape({}),
  children: PropTypes.node,
  classes: PropTypes.shape({}),
  content: PropTypes.node.isRequired,
  contentProps: PropTypes.shape({}),
  footer: PropTypes.shape({}),
  navigation: PropTypes.shape({}),
  showTitle: PropTypes.bool,
  slug: PropTypes.string,
  title: PropTypes.string,
};

ContentPage.defaultProps = {
  aside: undefined,
  asideProps: undefined,
  children: undefined,
  classes: undefined,
  contentProps: undefined,
  footer: undefined,
  navigation: undefined,
  showTitle: true,
  slug: undefined,
  title: undefined,
};

export default ContentPage;
