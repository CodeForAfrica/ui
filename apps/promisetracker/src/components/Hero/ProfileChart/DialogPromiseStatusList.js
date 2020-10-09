import React from "react";

import PropTypes from "prop-types";

import {
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import { RichTypography } from "@commons-ui/core";

import Status from "@/promisetracker/components/PromiseStatus";

const useStyles = makeStyles(({ breakpoints, typography }) => ({
  root: {},
  description: {},
  status: {
    margin: 0,
    marginRight: typography.pxToRem(10),
    fontSize: typography.pxToRem(7),
  },
  statusContainer: {
    minWidth: typography.pxToRem(80),
    [breakpoints.up("lg")]: {
      minWidth: typography.pxToRem(170),
    },
  },
  divider: {
    border: "1 px solid EBEBEB",
  },
}));

function DialogPromiseStatusList({ items, ...props }) {
  const classes = useStyles(props);

  if (!items?.length) {
    return null;
  }
  return (
    <List className={classes.root}>
      {items.map(({ description, ...statusProps }, i) => (
        <>
          <ListItem disableGutters alignItems="center">
            <ListItemAvatar className={classes.statusContainer}>
              <Status {...statusProps} classes={{ root: classes.status }} />
            </ListItemAvatar>
            <ListItemText
              secondary={
                <RichTypography
                  color="textPrimary"
                  variant="body2"
                  className={classes.description}
                >
                  {description}
                </RichTypography>
              }
            />
          </ListItem>
          {i < items.length - 1 && (
            <Divider component="li" className={classes.divider} />
          )}
        </>
      ))}
    </List>
  );
}

DialogPromiseStatusList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
    })
  ),
};

DialogPromiseStatusList.defaultProps = {
  items: undefined,
};

export default DialogPromiseStatusList;
