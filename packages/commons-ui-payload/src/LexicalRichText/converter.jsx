import { RichTypography } from "@commons-ui/next";
import { Box } from "@mui/material";

const DEFAULT_PROPS = {
  html: false,
};

export const styleConverter = (converterProps) => {
  const getTypographyProps = (node) => ({
    ...DEFAULT_PROPS,
    ...converterProps.TypographyProps,
    ...(node?.TypographyProps || {}),
  });

  /**
   * We need to use MUI components so that props like `sx` actually work.
   */
  function muiConverter(Component, { node, nodesToJSX, ...others }) {
    const children = nodesToJSX({
      nodes: node.children,
    });
    return (
      <Component {...others} {...getTypographyProps(node)}>
        {children}
      </Component>
    );
  }

  function richTypographyConverter(args) {
    return muiConverter(RichTypography, args);
  }

  return {
    heading: ({ node, nodesToJSX }) => {
      const { tag } = node;
      return richTypographyConverter({
        node,
        nodesToJSX,
        component: tag,
        variant: tag,
      });
    },
    quote: ({ node, nodesToJSX }) =>
      muiConverter(Box, { node, nodesToJSX, component: "blockquote" }),
    list: ({ node, nodesToJSX }) => {
      const { tag } = node;
      return richTypographyConverter({
        node,
        nodesToJSX,
        className: `list-${node?.listType}`,
        component: tag,
      });
    },
    paragraph: ({ node, nodesToJSX }) => {
      return richTypographyConverter({
        node,
        nodesToJSX,
      });
    },
  };
};

export default styleConverter;
