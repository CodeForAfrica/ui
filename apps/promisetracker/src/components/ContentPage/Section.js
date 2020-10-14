import React from "react";
import PropTypes from "prop-types";

import { Grid } from "@material-ui/core";

import { Section } from "@commons-ui/core";

import useStyles from "./useStyles";

/**
 * .
 */
function ContentSection({
  aside,
  asideProps,
  content,
  contentProps,
  title,
  ...props
}) {
  const classes = useStyles(props);

  return (
    <Section
      {...props}
      title={title}
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
  );
}

ContentSection.propTypes = {
  aside: PropTypes.node,
  asideProps: PropTypes.shape({}),
  content: PropTypes.node.isRequired,
  contentProps: PropTypes.shape({}),
  title: PropTypes.string,
};

ContentSection.defaultProps = {
  aside: undefined,
  asideProps: undefined,
  contentProps: undefined,
  title: undefined,
};

export default ContentSection;
