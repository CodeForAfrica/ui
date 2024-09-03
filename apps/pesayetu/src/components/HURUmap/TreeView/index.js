import { Typography } from "@mui/material";
import { SimpleTreeView, TreeItem } from "@mui/x-tree-view";
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
      <SimpleTreeView expanded={[expanded]}>
        {items.map((item) => {
          const itemId = slugify(item.title);

          return (
            <TreeItem
              itemId={itemId}
              key={itemId}
              label={
                <>
                  <Typography
                    data-id={itemId}
                    data-expand
                    variant="caption"
                    onClick={() => onLabelClick(itemId)}
                  >
                    {item.title}
                  </Typography>
                  <CheckIcon className={classes.icon} />
                </>
              }
              classes={{
                root: classes.tree,
                expanded: classes.expanded,
                label: classes.label,
              }}
            >
              {item.children.map((child) => {
                const childId = slugify(`${itemId}-${child.title}`);

                return (
                  <TreeItem
                    itemId={childId}
                    key={childId}
                    label={
                      <Typography
                        data-id={childId}
                        variant="caption"
                        onClick={() => onLabelClick(childId)}
                      >
                        {child.title}
                      </Typography>
                    }
                    onLabelClick={handleLabelClick}
                    classes={{
                      label: clsx(classes.label, classes.childLabel),
                    }}
                  />
                );
              })}
            </TreeItem>
          );
        })}
      </SimpleTreeView>
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
