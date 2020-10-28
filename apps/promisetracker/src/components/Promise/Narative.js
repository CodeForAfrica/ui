import React from "react";
import PropTypes from "prop-types";

import { IconButton, Typography } from "@material-ui/core";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@material-ui/lab";

import { makeStyles } from "@material-ui/core/styles";

import ShareIcon from "@/promisetracker/icons/Share";

const useStyles = makeStyles(({ palette, typography }) => ({
  root: {
    padding: "3rem 1rem 3rem 1rem",
    background: "#F7F7F7 0% 0% no-repeat padding-box",
  },

  content: {},
  share: {
    paddingTop: ".1rem",
    "&:hover": {
      backgroundColor: "inherit",
    },
  },
  timelineConnector: {
    backgroundColor: palette.primary.main,
  },
  timelineList: {
    paddingLeft: "0",
  },
  timelineItem: {
    "&:before": {
      display: "none",
    },
  },
  titleShareContainer: {
    fontSize: typography.h4.fontSize,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  timelineDot: {
    margin: 0,
    width: "2.2rem",
    height: "2.2rem",
    display: "flex",
    fontWeight: 600,
    justifyContent: "center",
    alignItems: "center",
  },
  timelineDate: {
    paddingBottom: ".5rem",
    paddingTop: ".25rem",
  },
  timelineDescription: {
    paddingBottom: "2rem",
  },
}));

function NarativeUpdates({ description, title, timelines, ...props }) {
  const classes = useStyles(props);

  return (
    <>
      <div className={classes.root}>
        <div className={classes.titleShareContainer}>
          <Typography className={classes.title} variant="h4">
            {title}
          </Typography>
          <IconButton aria-label="share" className={classes.share}>
            <ShareIcon color="primary" fontSize="inherit" />
          </IconButton>
        </div>
        <Typography className={classes.description} variant="body1">
          {description}
        </Typography>
        {timelines && (
          <Timeline
            boxS
            classes={{
              root: classes.timelineList,
            }}
          >
            {timelines.map((timeline, index) => (
              <TimelineItem
                key={timeline.date}
                classes={{
                  root: classes.timelineItem,
                }}
              >
                <TimelineSeparator>
                  <TimelineDot
                    color="primary"
                    classes={{
                      root: classes.timelineDot,
                    }}
                    variant="outlined"
                  >
                    <Typography variant="h4">{index + 1}</Typography>
                  </TimelineDot>
                  {index + 1 !== timelines.length && (
                    <TimelineConnector className={classes.timelineConnector} />
                  )}
                </TimelineSeparator>
                <TimelineContent
                  classes={{
                    root: classes.timelineDescription,
                  }}
                >
                  <Typography
                    color="primary"
                    className={classes.timelineDate}
                    variant="h5"
                  >
                    {timeline.date}
                  </Typography>

                  <Typography variant="body2">
                    {timeline.description}
                  </Typography>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        )}
      </div>
    </>
  );
}

NarativeUpdates.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  timelines: PropTypes.arrayOf(PropTypes.shape({})),
};

NarativeUpdates.defaultProps = {
  description: undefined,
  title: undefined,
  timelines: undefined,
};

export default NarativeUpdates;
