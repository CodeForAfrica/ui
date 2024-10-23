/* eslint-disable react/no-array-index-key */
import { Link, RichTypography } from "@commons-ui/next";
import { Box } from "@mui/material";
import React, { Fragment } from "react";
import { Text } from "slate";

import Media from "./Media";

const DEFAULT_PROPS = {
  html: false,
};

const mostIndentedNode = (node) => {
  let level = 1;
  let indentedNode = node;
  while (indentedNode.children?.type === "indent") {
    level += 1;
    indentedNode = indentedNode.children;
  }
  return { level, indentedNode };
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
      if (node.strikethrough) {
        text = <s key={i}>{text}</s>;
      }
      if (node.underline) {
        text = <u key={i}>{text}</u>;
      }

      // Handle other leaf types here...

      return <Fragment key={i}>{text}</Fragment>;
    }

    if (!node) {
      return null;
    }
    const TypographyProps = { ...DEFAULT_PROPS, ...props.TypographyProps };
    switch (node.type) {
      case "h1":
        return (
          <RichTypography {...TypographyProps} variant="h1" key={i}>
            {serialize(node.children)}
          </RichTypography>
        );
      case "h2":
        return (
          <RichTypography {...TypographyProps} variant="h2" key={i}>
            {serialize(node.children)}
          </RichTypography>
        );
      case "h3":
        return (
          <RichTypography {...TypographyProps} variant="h3" key={i}>
            {serialize(node.children)}
          </RichTypography>
        );
      case "h4":
        return (
          <RichTypography {...TypographyProps} variant="h4" key={i}>
            {serialize(node.children)}
          </RichTypography>
        );
      case "h5":
        return (
          <RichTypography {...TypographyProps} variant="h5" key={i}>
            {serialize(node.children)}
          </RichTypography>
        );
      case "h6":
        return (
          <RichTypography {...TypographyProps} variant="h6" key={i}>
            {serialize(node.children)}
          </RichTypography>
        );
      case "indent": {
        const { level, indentedNode } = mostIndentedNode(node);
        // TODO(kilemensi): Can we pass `level` to children & use `text-indent`?
        return (
          <Box
            sx={{
              pl: `${level * 16}px`, // 1 indention = 16px
            }}
            key={i}
          >
            {serialize(indentedNode.children, props)}
          </Box>
        );
      }
      case "link":
        // We use RichTypography instead of Link directly just incase props
        // such as LinkProps, etc. were passed in.
        // TODO(kilemensi): Figure out a better way so that we can use Link directly
        return (
          <RichTypography
            {...TypographyProps}
            component={Link}
            href={node.href}
            key={i}
          >
            {serialize(node.children)}
          </RichTypography>
        );
      case "quote":
        return <blockquote key={i}>{serialize(node.children)}</blockquote>;
      case "upload":
        if (node.relationTo === "media") {
          const { caption } = node.fields;

          return (
            <Media {...props.MediaProps} media={node.value} caption={caption} />
          );
        }
        // TODO(kilemensi): Do we need to handle other types of uploads such as documents?
        return null;
      default: {
        const { textAlign, type: component } = node;
        return (
          <RichTypography
            {...TypographyProps}
            component={component}
            textAlign={textAlign}
            key={i}
          >
            {serialize(node.children, props)}
          </RichTypography>
        );
      }
    }
  });

const RichText = React.forwardRef(function RichText(props, ref) {
  const { elements, variant, MediaProps, TypographyProps, ...other } = props;

  if (!elements?.length) {
    return null;
  }
  return (
    <Box {...other} ref={ref}>
      {serialize(elements, { MediaProps, TypographyProps })}
    </Box>
  );
});

export default RichText;
