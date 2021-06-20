import { RichTypography } from "@commons-ui/core";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";
import PropTypes from "prop-types";
import React from "react";

import useStyles from "./useStyles";

import Status from "@/promisetracker/components/PromiseStatus";

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
