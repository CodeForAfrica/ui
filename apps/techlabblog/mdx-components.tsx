import { Link, Typography } from "@mui/material";
import type { Variant } from "@mui/material/styles/createTypography";
import type { MDXComponents } from "mdx/types";

function createHeading(variant: Variant): HTMLHeadingElement {
  return ({ children, ...others }) => (
    <Typography
      {...others}
      variant={variant}
      sx={{
        scrollMarginTop: 48 + 16, // Toolbar height + 1M
        "&>a": {
          opacity: 0.65,
        },
        "& .icon.icon-link": {
          display: "none",
          paddingLeft: 1,
          // position: "relative"
        },
        "&:hover": {
          "& .icon.icon-link": {
            display: "initial",
          },
        },
        "& .icon.icon-link:before": {
          // position: "absolute",
          content: '"#"',
        },
      }}
    >
      {children}
    </Typography>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: createHeading("h1"),
    h2: createHeading("h2"),
    h3: createHeading("h3"),
    h4: createHeading("h4"),
    h5: createHeading("h5"),
    h6: createHeading("h6"),
    p: ({ children, ...others }) => (
      <Typography variant="body1" {...others}>
        {children}
      </Typography>
    ),
    a: ({ children, ...others }) => (
      <Link underline="none" color="inherit" {...others}>
        {children}
      </Link>
    ),
    ...components,
  };
}
