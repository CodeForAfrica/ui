import { Section } from "@commons-ui/core";
import { Grid, Typography } from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import H1 from "@/promisetracker/components/H1";

/**
 * .
 */
function ContentSection({
  aside,
  asideProps,
  content,
  contentProps,
  title,
  titleProps: titlePropsProps,
  ...props
}) {
  const classes = useStyles(props);
  const titleProps = { component: H1, ...titlePropsProps };

  return (
    <Section {...props} classes={{ root: classes.section }}>
      <Grid container justify="space-between" className={classes.grid}>
        <Grid
          item
          xs={12}
          lg={7}
          {...contentProps}
          className={classes.gridContent}
        >
          {title ? (
            <Typography {...titleProps} className={classes.sectionTitle}>
              {title}
            </Typography>
          ) : null}
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
  titleProps: PropTypes.shape({}),
};

ContentSection.defaultProps = {
  aside: undefined,
  asideProps: undefined,
  contentProps: undefined,
  title: undefined,
  titleProps: undefined,
};

export default ContentSection;
