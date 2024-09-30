import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

/** @type {import('rehype-pretty-code').Options} */
const rehypePrettyCodeOptions = {
  keepBackground: true,
  theme: {
    dark: "catppuccin-mocha",
    light: "catppuccin-latte",
  },
};

/** @type {import('rehype-autolink-headings').Options} */
const rehypeAutolinkHeadingsOptions = {
  behavior: "append",
};

export const remarkPlugins = [remarkFrontmatter, remarkMdxFrontmatter];
export const rehypePlugins = [
  [rehypePrettyCode, rehypePrettyCodeOptions],
  rehypeSlug,
  [rehypeAutolinkHeadings, rehypeAutolinkHeadingsOptions],
];
