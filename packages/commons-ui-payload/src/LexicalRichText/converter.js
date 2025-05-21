import { RichTypography } from "@commons-ui/next";

const DEFAULT_PROPS = {
  html: false,
};

export const styleConverter = (converterProps) => {
  const getTypographyProps = (node) => ({
    ...DEFAULT_PROPS,
    ...converterProps.TypographyProps,
    ...(node?.TypographyProps || {}),
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

export default styleConverter;
