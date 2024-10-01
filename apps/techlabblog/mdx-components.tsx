import type { LinkProps, TypographyProps } from "@mui/material";
// TODO(kilemensi): Switch to @cui/next/Link
import { Link, Typography } from "@mui/material";
import type { MDXComponents } from "mdx/types";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

function createHeading(level: HeadingLevel) {
  const Heading = ({ children, ...others }: TypographyProps) => (
    <Typography
      {...others}
      variant={`h${level}`}
      sx={{
        scrollMarginTop: 48 + 16, // Toolbar height + 1M
        "&>a": {
          opacity: 0.65,
        },
        "& .icon.icon-link": {
          display: "none",
          paddingLeft: 1,
        },
        "&:hover": {
          "& .icon.icon-link": {
            display: "initial",
          },
        },
        "& .icon.icon-link:before": {
          content: '"#"',
        },
      }}
    >
      {children}
    </Typography>
  );
  Heading.displayName = `Heading${level}`;

  return Heading;
}

const customComponents = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  p: ({ children, ...others }: TypographyProps) => (
    <Typography variant="body1" {...others}>
      {children}
    </Typography>
  ),
  a: ({ children, ...others }: LinkProps) => (
    <Link underline="none" color="inherit" {...others}>
      {children}
    </Link>
  ),
};

export function useMDXComponents(components?: MDXComponents) {
  return {
    ...customComponents,
    ...components,
  };
}
