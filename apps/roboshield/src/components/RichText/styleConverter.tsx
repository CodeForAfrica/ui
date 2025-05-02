import { JSXConverters } from "@payloadcms/richtext-lexical/react";
import { RichTypography, Link } from "@commons-ui/next";

const DEFAULT_PROPS = {
  html: false,
};

export const styleConverter = (converterProps: any): JSXConverters<any> => ({
  heading: ({ node, nodesToJSX }) => {
    const Tag = node.tag || "h1";
    return (
      <RichTypography variant={Tag} component={Tag}>
        {nodesToJSX({ nodes: node.children })}
      </RichTypography>
    );
  },
  quote: ({ node, nodesToJSX }) => (
    <blockquote>{nodesToJSX({ nodes: node.children })}</blockquote>
  ),
  link: ({ node, nodesToJSX }) => {
    return (
      <RichTypography
        component={Link}
        href={node.fields.url || node.href || ""}
        {...node?.typographyProps}
        {...converterProps.typographyProps}
        {...DEFAULT_PROPS}
      >
        {nodesToJSX({ nodes: node.children })}
      </RichTypography>
    );
  },
  paragraph: ({ node, nodesToJSX }) => {
    return (
      <RichTypography
        {...node?.typographyProps}
        {...DEFAULT_PROPS}
        {...converterProps}
      >
        {nodesToJSX({ nodes: node.children })}
      </RichTypography>
    );
  },
});
