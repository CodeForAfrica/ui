/* eslint-disable react/no-array-index-key */
import { Link } from "@commons-ui/next";
import { Box } from "@mui/material";
import React, { Fragment } from "react";
import { Text } from "slate";

import LineClampedRichTypography from "@/charterafrica/components/LineClampedRichTypography";

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
          <LineClampedRichTypography
            {...DEFAULT_PROPS}
            {...props}
            variant="h1"
            key={i}
          >
            {serialize(node.children)}
          </LineClampedRichTypography>
        );
      case "h2":
        return (
          <LineClampedRichTypography
            {...DEFAULT_PROPS}
            {...props}
            variant="h2"
            key={i}
          >
            {serialize(node.children)}
          </LineClampedRichTypography>
        );
      case "h3":
        return (
          <LineClampedRichTypography
            {...DEFAULT_PROPS}
            {...props}
            variant="h3"
            key={i}
          >
            {serialize(node.children)}
          </LineClampedRichTypography>
        );
      case "h4":
        return (
          <LineClampedRichTypography
            {...DEFAULT_PROPS}
            {...props}
            variant="h4"
            key={i}
          >
            {serialize(node.children)}
          </LineClampedRichTypography>
        );
      case "h5":
        return (
          <LineClampedRichTypography
            {...DEFAULT_PROPS}
            {...props}
            variant="h5"
            key={i}
          >
            {serialize(node.children)}
          </LineClampedRichTypography>
        );
      case "h6":
        return (
          <LineClampedRichTypography
            {...DEFAULT_PROPS}
            {...props}
            variant="h6"
            key={i}
          >
            {serialize(node.children)}
          </LineClampedRichTypography>
        );
      case "quote":
        return <blockquote key={i}>{serialize(node.children)}</blockquote>;
      case "link":
        return (
          <Link href={node.href} key={i}>
            {serialize(node.children)}
          </Link>
        );
      default:
        return (
          <LineClampedRichTypography
            component={node.type}
            {...DEFAULT_PROPS}
            {...props}
            key={i}
          >
            {serialize(node.children)}
          </LineClampedRichTypography>
        );
    }
  });

const RichText = React.forwardRef(function RichText(props, ref) {
  const { color, elements, sx, ...other } = props;

  if (!elements?.length) {
    return null;
  }
  return (
    <Box color={color} sx={sx} ref={ref}>
      {serialize(elements, other)}
    </Box>
  );
});

export default RichText;
