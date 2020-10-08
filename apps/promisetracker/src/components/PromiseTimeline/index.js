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

function Index({ duration, events, statuses, ...props }) {
  const classes = useStyles(props);
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <>
      <svg width="100%" height="140" className={classes.root}>
        <rect
          x="8"
          y="69"
          width="100%"
          height="2"
          style={{
            fill: "#EBEBEB",
          }}
        />
        {isDesktop &&
          events?.map((event) => (
            <>
              <PromiseEvent key={event.label} duration={duration} {...event} />
            </>
          ))}
        {statuses?.map((status) => (
          <PromiseStatus key={status.title} duration={duration} {...status}>
            <rect
              x="8"
              y="69"
              width="100%"
              height="2"
              style={{
                fill: "#EBEBEB",
              }}
            />
          </PromiseStatus>
        ))}
        <Labels duration={duration} />
      </svg>
    </>
  );
}

Index.propTypes = {
  duration: PropTypes.arrayOf(PropTypes.number),
  events: PropTypes.arrayOf(PropTypes.shape({})),
  statuses: PropTypes.arrayOf(PropTypes.shape({})),
};
Index.defaultProps = {
  duration: [2012, 2018],
  events: undefined,
  statuses: undefined,
};

export default Index;
