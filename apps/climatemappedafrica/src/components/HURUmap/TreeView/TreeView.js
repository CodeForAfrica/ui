import { Box, SvgIcon } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import {
  TreeItem2Checkbox,
  TreeItem2Content,
  TreeItem2GroupTransition,
  TreeItem2IconContainer,
  TreeItem2Label,
  TreeItem2Root,
} from "@mui/x-tree-view/TreeItem2";
import { TreeItem2Icon } from "@mui/x-tree-view/TreeItem2Icon";
import { TreeItem2Provider } from "@mui/x-tree-view/TreeItem2Provider";
import { useTreeItem2 } from "@mui/x-tree-view/useTreeItem2";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import CheckIcon from "@/climatemappedafrica/assets/icons/checked.svg";
import slugify from "@/climatemappedafrica/utils/slugify";

const CustomTreeItemContent = styled(TreeItem2Content)(({ theme }) => ({
  background: "inherit",
  borderRadius: 0,
  borderBottom: `1px solid transparent`,
  borderRight: `2px solid transparent`,
  padding: 0,
  paddingRight: theme.spacing(2.5),
  "&:hover": {
    background: "inherit",
  },
  "&.expanded": {
    borderRadius: 0,
    backgroundColor: theme.palette.background.default,
    borderRight: `2px solid ${theme.palette.primary.main}`,
    borderBottom: `1px solid ${theme.palette.grey.main}`,
  },
}));

const CustomTreeItem = React.forwardRef(function CustomTreeItem(props, ref) {
  const { id, itemId, label, disabled, children, ...other } = props;

  const {
    getRootProps,
    getContentProps,
    getIconContainerProps,
    getCheckboxProps,
    getLabelProps,
    getGroupTransitionProps,
    status,
  } = useTreeItem2({ id, itemId, children, label, disabled, rootRef: ref });

  return (
    <TreeItem2Provider itemId={itemId}>
      <TreeItem2Root {...getRootProps(other)}>
        <CustomTreeItemContent
          {...getContentProps({
            className: clsx("content", {
              expanded: status.expanded,
              selected: status.selected,
              focused: status.focused,
            }),
            sx: (theme) => ({
              ...(!children && {
                pr: 0,
                "&: hover": {
                  background: alpha(theme.palette.common.black, 0.04),
                },
              }),
            }),
          })}
        >
          <TreeItem2Checkbox {...getCheckboxProps()} />
          <TreeItem2Label
            {...getLabelProps({
              sx: (theme) => ({
                ...theme.typography.caption,
                height: 38,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                fontWeight: 500,
                letterSpacing: 0.6,
                ...(!children && {
                  fontWeight: 300,
                  paddingRight: 2.5,
                }),
              }),
            })}
          />
          <TreeItem2IconContainer
            {...getIconContainerProps({
              sx: {
                ...(!children && { display: "none" }),
              },
            })}
          >
            <TreeItem2Icon status={status} />
          </TreeItem2IconContainer>
        </CustomTreeItemContent>
        {children && (
          <TreeItem2GroupTransition {...getGroupTransitionProps()} />
        )}
      </TreeItem2Root>
    </TreeItem2Provider>
  );
});

function CollapseIcon({ sx, ...props }) {
  return (
    <SvgIcon
      component={CheckIcon}
      inheritViewBox
      {...props}
      sx={[
        {
          fill: "#666666",
        },
        // TODO(kilemensi): Review our use of `sx`` to ensure we folllow
        //                  https://mui.com/system/getting-started/the-sx-prop/#passing-the-sx-prop
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}

function ExpandIcon({ sx, ...props }) {
  return (
    <CollapseIcon
      {...props}
      sx={[
        (theme) => ({
          fill: theme.palette.grey.main,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}

const TreeView = React.forwardRef(function TreeView(props, ref) {
  const { items, onLabelClick, sx, ...others } = props;

  const handleItemClick = (e, itemId) => {
    e.preventDefault();

    if (onLabelClick) {
      onLabelClick(itemId);
    }
  };
  if (!items?.length) {
    return null;
  }
  return (
    <Box
      {...others}
      sx={[
        ({ palette }) => ({
          textAlign: "right",
          background: palette.background.paper,
        }),
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      ref={ref}
    >
      <SimpleTreeView
        slots={{
          collapseIcon: CollapseIcon,
          expandIcon: ExpandIcon,
        }}
        onItemClick={handleItemClick}
      >
        {items.map((item) => {
          const itemId = slugify(item.title);

          return (
            <CustomTreeItem itemId={itemId} key={itemId} label={item.title}>
              {item.children.map((child) => {
                const childId = slugify(`${itemId}-${child.title}`);

                return (
                  <CustomTreeItem
                    itemId={childId}
                    key={childId}
                    label={child.title}
                  />
                );
              })}
            </CustomTreeItem>
          );
        })}
      </SimpleTreeView>
    </Box>
  );
});

TreeView.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      children: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
        }),
      ),
    }),
  ),
  onLabelClick: PropTypes.func,
};

export default TreeView;
