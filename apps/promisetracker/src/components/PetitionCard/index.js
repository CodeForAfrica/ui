import { RichTypography } from "@commons-ui/core";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import Status from "@/promisetracker/components/PromiseStatus";

const useStyles = makeStyles(({ breakpoints, palette, typography }) => ({
  root: {
    border: "1px solid #EBEBEB",
    minWidth: typography.pxToRem(314),
    [breakpoints.up("lg")]: {},
  },
  content: {
    padding: 0,
  },
  contentRoot: {
    height: "100%",
    padding: `${typography.pxToRem(36)} ${typography.pxToRem(16)}`,
    "&:hover": {
      backgroundColor: "inherit",
    },
  },
  supporters: {
    fontSize: typography.pxToRem(10),
    fontWeight: "bold",
    marginTop: typography.pxToRem(20),
    textTransform: "uppercase",
  },
  author: {
    color: palette.primary.main,
    fontSize: typography.pxToRem(10),
    fontWeight: "bold",
    marginLeft: typography.pxToRem(20),
    marginTop: typography.pxToRem(20),
    opacity: 0.59,
    textTransform: "uppercase",
  },
  description: {},
  descriptionContainer: {
    marginTop: typography.pxToRem(21 - 9),
    maxHeight: typography.pxToRem(24 * 3), // Max 3 lines defined by body2.lineHeight
    overflow: "hidden",
    [breakpoints.up("lg")]: {
      marginTop: typography.pxToRem(30 - 7),
    },
  },
  title: {},
  titleContainer: {
    marginTop: typography.pxToRem(20),
    maxHeight: typography.pxToRem(24 * 2), // Max 2 lines defined by h4.lineHeight
    overflow: "hidden",
    alignItems: "flex-start",
  },
  status: {
    backgroundColor: palette.secondary.main,
  },
  cta: {
    color: palette.highlight.main,
    fontSize: typography.pxToRem(10),
    fontWeight: "bold",
    marginTop: typography.pxToRem(20),
    textDecoration: "underline",
    textTransform: "uppercase",
  },
}));

function PostCard({
  author,
  children,
  classes: classesProp,
  as,
  description,
  title,
  status,
  supporters,
  ...props
}) {
  const classes = useStyles({ classes: classesProp });

  return (
    <Card square variant="outlined" className={classes.root}>
      <CardActionArea as={as} {...props} className={classes.contentRoot}>
        <CardContent classes={{ root: classes.content }}>
          <Status title={status} classes={{ root: classes.status }} />
          <Box
            display="flex"
            alignItems="flex-end"
            className={classes.titleContainer}
          >
            <RichTypography variant="h4" className={classes.title}>
              {title}
            </RichTypography>
          </Box>
          <Grid container justify="flex-start">
            <Grid item>
              <RichTypography variant="caption" className={classes.supporters}>
                {supporters}
              </RichTypography>
            </Grid>
            <Grid item>
              <RichTypography variant="caption" className={classes.author}>
                {author}
              </RichTypography>
            </Grid>
          </Grid>
        </CardContent>
        {description && (
          <CardContent classes={{ root: classes.content }}>
            <Box display="flex" className={classes.descriptionContainer}>
              <RichTypography variant="body2" className={classes.description}>
                {description}
              </RichTypography>
            </Box>
          </CardContent>
        )}
        <CardContent classes={{ root: classes.content }}>
          <RichTypography variant="caption" className={classes.cta}>
            Learn More
          </RichTypography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

PostCard.propTypes = {
  author: PropTypes.string,
  children: PropTypes.node,
  classes: PropTypes.shape({
    author: PropTypes.string,
    content: PropTypes.string,
    contentRoot: PropTypes.string,
    cta: PropTypes.string,
    description: PropTypes.string,
    descriptionContainer: PropTypes.string,
    root: PropTypes.string,
    status: PropTypes.string,
    supporters: PropTypes.string,
    title: PropTypes.string,
    titleContainer: PropTypes.string,
  }),
  supporters: PropTypes.string,
  description: PropTypes.string,
  title: PropTypes.string.isRequired,
  href: PropTypes.string,
  as: PropTypes.string,
  status: PropTypes.string,
};

PostCard.defaultProps = {
  author: undefined,
  children: undefined,
  classes: undefined,
  description: undefined,
  href: undefined,
  as: undefined,
  supporters: undefined,
  status: undefined,
};

export default PostCard;
