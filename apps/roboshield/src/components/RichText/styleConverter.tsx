import { JSXConverters } from "@payloadcms/richtext-lexical/react";
import { RichTypography, Link } from "@commons-ui/next";

const DEFAULT_PROPS = {
  html: false,
};

export const styleConverter = (converterProps: any): JSXConverters<any> => {
  const getTypographyProps = (node: any) => ({
    ...DEFAULT_PROPS,
    ...converterProps.typographyProps,
    ...(node?.typographyProps || {}),
  });

  return {
    heading: ({ node, nodesToJSX }) => {
      const Tag = node.tag;
      return (
        <RichTypography
          variant={Tag}
          component={Tag}
          {...getTypographyProps(node)}
        >
          {nodesToJSX({ nodes: node.children })}
        </RichTypography>
      );
    },
    quote: ({ node, nodesToJSX }) => (
      <blockquote {...getTypographyProps(node)}>
        {nodesToJSX({ nodes: node.children })}
      </blockquote>
    ),

    paragraph: ({ node, nodesToJSX }) => {
      return (
        <RichTypography {...getTypographyProps(node)}>
          {nodesToJSX({ nodes: node.children })}
        </RichTypography>
      );
    },
  };
};
