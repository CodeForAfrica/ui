import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { useMediaQuery } from "@material-ui/core";
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
  date,
  status,
  statusHistory: StatusHistoryProps,
  ...props
}) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const statusHistory = isDesktop ? StatusHistoryProps : [status];
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
        events?.map((event) => (
          <>
            <PromiseEvent key={event.label} {...event} />
          </>
        ))}
      {statusHistory?.map((currentStatus, idx) => (
        <PromiseStatus
          key={currentStatus.title}
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
  date: PropTypes.string,
  status: PropTypes.shape({}),
  statusHistory: PropTypes.arrayOf(PropTypes.shape({})),
};
PromiseTimeline.defaultProps = {
  date: undefined,
  events: [],
  status: undefined,
  statusHistory: undefined,
};

export default PromiseTimeline;
