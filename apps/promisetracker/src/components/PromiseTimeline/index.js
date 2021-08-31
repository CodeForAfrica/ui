import { useMediaQuery } from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";

import Labels from "./Labels";
import PromiseEvent from "./PromiseEvent";
import PromiseStatus from "./PromiseStatus";

const useStyles = makeStyles(() => ({
  root: {
    overflow: "visible",
  },
}));

function PromiseTimeline({
  events,
  status,
  statusHistory: statusHistoryProp,
  ...props
}) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const statusHistory = isDesktop ? statusHistoryProp : [status];

  return (
    <svg width="100%" height="100" className={classes.root}>
      <rect
        x="8"
        y="69"
        width="99%"
        height="1"
        style={{
          fill: "#EBEBEB",
        }}
      />
      {isDesktop &&
        events?.map((event) => <PromiseEvent key={event.label} {...event} />)}
      {statusHistory?.map((currentStatus, idx) => (
        <PromiseStatus
          key={currentStatus.date}
          isOdd={idx % 2 === 1}
          {...currentStatus}
        >
          {idx === 0 && (
            <rect
              x="8"
              y="69"
              width="99%"
              height="1"
              style={{
                fill: "#EBEBEB",
              }}
            />
          )}
        </PromiseStatus>
      ))}
      <Labels />
    </svg>
  );
}

PromiseTimeline.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({})),
  status: PropTypes.shape({}),
  statusHistory: PropTypes.arrayOf(PropTypes.shape({})),
};
PromiseTimeline.defaultProps = {
  events: [],
  status: undefined,
  statusHistory: undefined,
};

export default PromiseTimeline;
