/* eslint-disable react/no-array-index-key */
import { Link, RichTypography } from "@commons-ui/next";
import { Box } from "@mui/material";
import React, { Fragment, ReactNode, forwardRef } from "react";
import { Node, Text } from "slate";

const DEFAULT_PROPS = {
  html: false,
};

interface NodeProps {
  children?: Node[];
  type?: string;
  href?: string;
  bold?: boolean;
  code?: boolean;
  italic?: boolean;
  text?: ReactNode;
}

interface SerializeProps {
  html?: boolean;
  [key: string]: any;
}

const serialize = (
  children: NodeProps[] | undefined,
  props?: SerializeProps,
): ReactNode[] | null =>
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
  }) || null;

interface RichTextProps {
  elements: NodeProps[];
  variant?: string;
  typographyProps?: SerializeProps;
  [key: string]: any;
}

const RichText = forwardRef<HTMLDivElement, RichTextProps>(
  function RichText(props, ref) {
    const { elements, variant, typographyProps, ...other } = props;

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

export default RichText;
