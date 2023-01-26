/* eslint-disable react/no-array-index-key */
import { RichTypography } from "@commons-ui/core";
import { Link } from "@commons-ui/next";
import React, { Fragment } from "react";
import { Text } from "slate";

const serialize = (children, defaultProps) =>
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

    switch (node.type) {
      case "h1":
        return (
          <RichTypography variant="h1" key={i}>
            {serialize(node.children)}
          </RichTypography>
        );
      case "h2":
        return (
          <RichTypography variant="h2" key={i}>
            {serialize(node.children)}
          </RichTypography>
        );
      case "h3":
        return (
          <RichTypography variant="h3" key={i}>
            {serialize(node.children)}
          </RichTypography>
        );
      case "h4":
        return (
          <RichTypography variant="h4" key={i}>
            {serialize(node.children)}
          </RichTypography>
        );
      case "h5":
        return (
          <RichTypography variant="h5" key={i}>
            {serialize(node.children)}
          </RichTypography>
        );
      case "h6":
        return (
          <RichTypography variant="h6" key={i}>
            {serialize(node.children)}
          </RichTypography>
        );
      case "quote":
        return <blockquote key={i}>{serialize(node.children)}</blockquote>;
      case "ul":
        return <ul key={i}>{serialize(node.children)}</ul>;
      case "ol":
        return <ol key={i}>{serialize(node.children)}</ol>;
      case "li":
        return <li key={i}>{serialize(node.children)}</li>;
      case "link":
        return (
          <Link href={node.href} key={i}>
            {serialize(node.children)}
          </Link>
        );

      default:
        return (
          <RichTypography component="p" {...defaultProps} key={i}>
            {serialize(node.children)}
          </RichTypography>
        );
    }
  });

const RichText = React.forwardRef(function RichText(props, ref) {
  const { elements, ...others } = props;
  if (!elements?.length) {
    return null;
  }
  return (
    <React.Fragment ref={ref}>{serialize(elements, others)}</React.Fragment>
  );
});

export default RichText;
