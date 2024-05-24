import makeStyles from "@mui/styles/makeStyles";
import PropTypes from "prop-types";
import React from "react";

import Link from "@/hurumap/components/Link";
import Hero from "@/hurumap/components/OtherHero";
import Section from "@/hurumap/components/Section";
import Stories from "@/hurumap/components/Stories";
import Tabs from "@/hurumap/components/Tabs";

const useStyles = makeStyles(({ typography, breakpoints }) => ({
  root: {},
  section: {
    marginTop: typography.pxToRem(40),
    [breakpoints.up("md")]: {
      marginTop: typography.pxToRem(60),
    },
  },
}));

function StoriesPage({
  activeCategory: category,
  categories,
  items,
  hero,
  featuredStories,
  page,
  ...props
}) {
  const classes = useStyles(props);

  const tabItems = categories?.map(({ name, slug }) => {
    const { posts, pagination } = items;
    return {
      label: name,
      slug,
      href: `/stories/${slug}`,
      children: (
        <Stories
          featuredStoryProps={featuredStories[slug]}
          category={slug}
          pagination={pagination}
          items={posts}
          page={page}
        />
      ),
    };
  });

  return (
    <div className={classes.root}>
      {page === 1 && <Hero {...hero} />}
      <Section classes={{ root: classes.section }}>
        <Tabs
          key={`${category}-${page}`}
          name={category}
          activeTab={category}
          items={tabItems}
          linkComponent={Link}
        />
      </Section>
    </div>
  );
}

StoriesPage.propTypes = {
  activeCategory: PropTypes.string,
  items: PropTypes.shape({
    pagination: PropTypes.shape({}),
    posts: PropTypes.arrayOf(PropTypes.shape({})),
  }),
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string,
    }),
  ),
  featuredStories: PropTypes.shape({
    news: PropTypes.shape({}),
    insights: PropTypes.shape({}),
  }),
  hero: PropTypes.shape({}),
  page: PropTypes.number,
};

StoriesPage.defaultProps = {
  activeCategory: undefined,
  categories: undefined,
  items: undefined,
  featuredStories: undefined,
  hero: undefined,
  page: undefined,
};

export default StoriesPage;
