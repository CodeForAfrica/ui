/* eslint-disable react/no-array-index-key */
import { Link, RichTypography } from "@commons-ui/next";
import { Box } from "@mui/material";
import type { BoxProps } from "@mui/material";
import React, { Fragment, ReactNode, forwardRef } from "react";
import { Text } from "slate";

const DEFAULT_PROPS = {
  html: false,
};

// eslint-disable-next-line no-use-before-define
type Children = Leaf[];

interface Leaf {
  children?: Children;
  type?: string;
  bold?: boolean;
  code?: boolean;
  href?: string;
  italic?: boolean;
  strikethrough?: boolean;
  text?: ReactNode;
  underline?: boolean;
  [key: string]: unknown;
}

interface SerializeProps {
  html?: boolean;
  [key: string]: any;
}

function serialize(
  children: Children | undefined,
  props?: SerializeProps,
): ReactNode | null {
  if (!children) {
    return null;
  }
  return children.map((node, i) => {
    if (Text.isText(node)) {
      let text = <span dangerouslySetInnerHTML={{ __html: node.text }} />;
      if (node.bold) {
        text = <strong key={i}>{text}</strong>;
      }
      if (node.code) {
        text = <code key={i}>{text}</code>;
      }
      if (node.italic) {
        text = <em key={i}>{text}</em>;
      }
      if (node.underline) {
        text = (
          <span style={{ textDecoration: "underline" }} key={i}>
            {text}
          </span>
        );
      }
      if (node.strikethrough) {
        text = (
          <span style={{ textDecoration: "line-through" }} key={i}>
            {text}
          </span>
        );
      }
      return <Fragment key={i}>{text}</Fragment>;
    }

    if (!node) {
      return null;
    }

    switch (node.type) {
      case "h1":
        return (
          <RichTypography {...DEFAULT_PROPS} {...props} variant="h1" key={i}>
            {serialize(node.children, props)}
          </RichTypography>
        );
      case "h2":
        return (
          <RichTypography {...DEFAULT_PROPS} {...props} variant="h2" key={i}>
            {serialize(node.children, props)}
          </RichTypography>
        );
      case "h3":
        return (
          <RichTypography {...DEFAULT_PROPS} {...props} variant="h3" key={i}>
            {serialize(node.children, props)}
          </RichTypography>
        );
      case "h4":
        return (
          <RichTypography {...DEFAULT_PROPS} {...props} variant="h4" key={i}>
            {serialize(node.children, props)}
          </RichTypography>
        );
      case "h5":
        return (
          <RichTypography {...DEFAULT_PROPS} {...props} variant="h5" key={i}>
            {serialize(node.children, props)}
          </RichTypography>
        );
      case "h6":
        return (
          <RichTypography {...DEFAULT_PROPS} {...props} variant="h6" key={i}>
            {serialize(node.children, props)}
          </RichTypography>
        );
      case "quote":
        return (
          <blockquote key={i}>{serialize(node.children, props)}</blockquote>
        );
      case "link":
        return (
          <RichTypography component={Link} href={node.href} key={i} {...props}>
            {serialize(node.children, props)}
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
}

interface RichTextProps extends BoxProps {
  elements?: Children;
  typographyProps?: SerializeProps;
}

const RichText = forwardRef<BoxProps, RichTextProps>(
  function RichText(props, ref) {
    const { elements, typographyProps, ...other } = props;

    if (!elements?.length) {
      return null;
    }
    return (
      <Box {...other} ref={ref}>
        {serialize(elements, typographyProps)}
      </Box>
    );
  },
);

export type { Children };
export default RichText;
