/* eslint-disable react/no-array-index-key */
import { Link, RichTypography } from "@commons-ui/next";
import { Box } from "@mui/material";
import React, { Fragment } from "react";
import { Text } from "slate";

const DEFAULT_PROPS = {
  html: false,
};

const serialize = (children, props) =>
  children?.map((node, i) => {
    if (Text.isText(node)) {
      let { text } = node;
      if (node.bold) {
        text = <strong key={i}>{text}</strong>;
      }
      if (node.code) {
        text = <code key={i}>{text}</code>;
      }
      if (node.italic) {
        text = <em key={i}>{text}</em>;
      }

      // Handle other leaf types here...

      return <Fragment key={i}>{text}</Fragment>;
    }

    if (!node) {
      return null;
    }
    // TODO(kilemensi): handle node.type === indent
    switch (node.type) {
      case "h1":
        return (
          <RichTypography {...DEFAULT_PROPS} {...props} variant="h1" key={i}>
            {serialize(node.children)}
          </RichTypography>
        );
      case "h2":
        return (
          <RichTypography {...DEFAULT_PROPS} {...props} variant="h2" key={i}>
            {serialize(node.children)}
          </RichTypography>
        );
      case "h3":
        return (
          <RichTypography {...DEFAULT_PROPS} {...props} variant="h3" key={i}>
            {serialize(node.children)}
          </RichTypography>
        );
      case "h4":
        return (
          <RichTypography {...DEFAULT_PROPS} {...props} variant="h4" key={i}>
            {serialize(node.children)}
          </RichTypography>
        );
      case "h5":
        return (
          <RichTypography {...DEFAULT_PROPS} {...props} variant="h5" key={i}>
            {serialize(node.children)}
          </RichTypography>
        );
      case "h6":
        return (
          <RichTypography {...DEFAULT_PROPS} {...props} variant="h6" key={i}>
            {serialize(node.children)}
          </RichTypography>
        );
      case "quote":
        return <blockquote key={i}>{serialize(node.children)}</blockquote>;
      case "link":
        return (
          <RichTypography component={Link} href={node.href} key={i} {...props}>
            {serialize(node.children)}
          </RichTypography>
        );
      default:
        return (
          <RichTypography
            component={node.type}
            {...DEFAULT_PROPS}
            {...props}
            key={i}
          >
            {serialize(node.children, props)}
          </RichTypography>
        );
    }
  });

const RichText = React.forwardRef(function RichText(props, ref) {
  const { elements, variant, typographyProps, ...other } = props;
  if (!elements?.length) {
    return null;
  }
  return (
    <Box {...other} ref={ref}>
      {serialize(elements, typographyProps)}
    </Box>
  );
});

export default RichText;
