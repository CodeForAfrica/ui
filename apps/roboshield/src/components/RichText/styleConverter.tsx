import { JSXConverters } from "@payloadcms/richtext-lexical/react";
import { RichTypography, Link } from "@commons-ui/next";

const DEFAULT_PROPS = {
  html: false,
};

export const styleConverter = (converterProps: any): JSXConverters<any> => ({
  heading: ({ node, nodesToJSX }) => {
    const Tag = node.tag;
    return (
      <RichTypography
        variant={Tag}
        component={Tag}
        {...converterProps.typographyProps}
      >
        {nodesToJSX({ nodes: node.children })}
      </RichTypography>
    );
  },
  quote: ({ node, nodesToJSX }) => (
    <blockquote>{nodesToJSX({ nodes: node.children })}</blockquote>
  ),

  paragraph: ({ node, nodesToJSX }) => {
    return (
      <RichTypography
        {...node?.typographyProps}
        {...DEFAULT_PROPS}
        {...converterProps.typographyProps}
      >
        {nodesToJSX({ nodes: node.children })}
      </RichTypography>
    );
  },
});
