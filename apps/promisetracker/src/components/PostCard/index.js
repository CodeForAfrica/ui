import React from "react";
import PropTypes from "prop-types";

import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
} from "@material-ui/core";

import { RichTypography } from "@commons-ui/core";
import Share from "@/promisetracker/components/Share";
import server from "@/promisetracker/lib/server";
import useStyles from "./useStyles";

function PostCard({
  children,
  classes: classesProp,
  date,
  description,
  image,
  title,
  as,
  ...props
}) {
  const classes = useStyles({ classes: classesProp });
  const siteServer = server();
  return (
    <Card square variant="outlined" className={classes.root}>
      <CardActionArea as={as} {...props} className={classes.contentRoot}>
        <CardContent classes={{ root: classes.content }}>
          <Box
            display="flex"
            alignItems="flex-end"
            className={classes.titleContainer}
          >
            <RichTypography variant="h4" className={classes.title}>
              {title}
            </RichTypography>
          </Box>
          <Grid container justify="space-between">
            <Grid item>
              <RichTypography variant="h6" className={classes.date}>
                {date}
              </RichTypography>
            </Grid>
            <Grid item>
              <Share
                classes={{ root: classes.share }}
                link={siteServer.url + (as || "")}
                title={title}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardMedia
          alt={title}
          component="img"
          image={image}
          title={title}
          className={classes.media}
        />
        {description && (
          <CardContent classes={{ root: classes.content }}>
            <Box display="flex" className={classes.descriptionContainer}>
              <RichTypography variant="body2" className={classes.description}>
                {description}
              </RichTypography>
            </Box>
          </CardContent>
        )}
        {children}
      </CardActionArea>
    </Card>
  );
}

PostCard.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.shape({
    content: PropTypes.string,
    contentRoot: PropTypes.string,
    date: PropTypes.string,
    description: PropTypes.string,
    descriptionContainer: PropTypes.string,
    media: PropTypes.string,
    root: PropTypes.string,
    share: PropTypes.string,
    title: PropTypes.string,
    titleContainer: PropTypes.string,
  }),
  date: PropTypes.string.isRequired,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  href: PropTypes.string,
  as: PropTypes.string,
};

PostCard.defaultProps = {
  children: undefined,
  classes: undefined,
  description: undefined,
  href: undefined,
  as: undefined,
};

export default PostCard;
