import { Typography } from "@mui/material";
import { SimpleTreeView as MuiTreeView, TreeItem } from "@mui/x-tree-view";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useState } from "react";

import useStyles from "./useStyles";

import { ReactComponent as CheckIcon } from "@/pesayetu/assets/icons/checked.svg";
import slugify from "@/pesayetu/utils/slugify";

function TreeView({ items, onLabelClick, ...props }) {
  const classes = useStyles(props);
  const [expanded, setExpanded] = useState();

  const handleLabelClick = (e) => {
    e.preventDefault();
    const { id, expand } = e.target.dataset;
    if (expand) {
      setExpanded(id);
    }
    if (onLabelClick) {
      onLabelClick(id);
    }
  };

  if (!items?.length) {
    return null;
  }
  return (
    <div className={classes.root}>
      <MuiTreeView expanded={[expanded]}>
        {items.map((item) => {
          const itemId = slugify(item.title);

          return (
            <TreeItem
              key={itemId}
              itemId={itemId}
              label={
                <Typography
                  variant="caption"
                  data-id={itemId}
                  data-expand
                  onClick={handleLabelClick}
                >
                  {item.title}
                  <CheckIcon className={classes.icon} />
                </Typography>
              }
              classes={{
                root: classes.tree,
                expanded: classes.expanded,
                label: classes.label,
              }}
            >
              {item.children.map((child) => {
                const childId = `${itemId}-${slugify(child.title)}`;

                return (
                  <TreeItem
                    key={childId}
                    itemId={childId}
                    label={
                      <Typography
                        data-id={childId}
                        onClick={handleLabelClick}
                        variant="caption"
                        width="100%"
                      >
                        {child.title}
                      </Typography>
                    }
                    classes={{
                      label: clsx(classes.label, classes.childLabel),
                    }}
                  />
                );
              })}
            </TreeItem>
          );
        })}
      </MuiTreeView>
    </div>
  );
}

TreeView.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      children: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  ),
  onLabelClick: PropTypes.func,
};

TreeView.defaultProps = {
  items: undefined,
  onLabelClick: undefined,
};

export default TreeView;
