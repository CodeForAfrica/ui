import React from "react";
import PropTypes from "prop-types";

import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";

import { RichTypography } from "@commons-ui/core";

import Status from "@/promisetracker/components/PromiseStatus";

import useStyles from "./useStyles";

function PromiseStatusList({ items, ...props }) {
  const classes = useStyles(props);

  if (!items?.length) {
    return null;
  }
  return (
    <List className={classes.root}>
      {items.map(({ description, ...statusProps }, i) => (
        <ListItem
          key={statusProps.title}
          alignItems="center"
          disableGutters
          divider={i < items.length - 1}
        >
          <ListItemAvatar className={classes.statusContainer}>
            <Status {...statusProps} classes={{ root: classes.status }} />
          </ListItemAvatar>
          <ListItemText
            disableTypography
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
      ))}
    </List>
  );
}

PromiseStatusList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
    })
  ),
};

PromiseStatusList.defaultProps = {
  items: undefined,
};

export default PromiseStatusList;
