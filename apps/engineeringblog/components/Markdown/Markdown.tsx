// Addapted from https://amirardalan.com/blog/syntax-highlight-code-in-markdown
import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import java from "react-syntax-highlighter/dist/cjs/languages/prism/java";
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";
import jsx from "react-syntax-highlighter/dist/cjs/languages/prism/jsx";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import python from "react-syntax-highlighter/dist/cjs/languages/prism/python";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import CopyCodeButton from "./CopyCodeButton";

import rangeParser from "parse-numeric-range";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Box } from "@mui/material";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("js", javascript);
SyntaxHighlighter.registerLanguage("python", python);
SyntaxHighlighter.registerLanguage("jsx", jsx);
SyntaxHighlighter.registerLanguage("java", java);

const Pre = ({ children }: { children: JSX.Element }) => (
  <Box
    component="pre"
    sx={{
      position: "relative",
      padding: "1em",
      backgroundColor: "#282c34",
      borderRadius: "5px",
      overflow: "auto",
    }}
  >
    <CopyCodeButton>{children}</CopyCodeButton>
    {children}
  </Box>
);

const Markdown = React.forwardRef(function Markdown({
  markdown,
}: {
  markdown: string;
}) {
  const syntaxTheme = oneDark;

  const MarkdownComponents: Components = {
    pre: Pre,
    code({ node, className, children, ...props }) {
      const hasLang = /language-(\w+)/.exec(className || "");
      const hasMeta = node?.data?.meta;

      const applyHighlights = (lineNumber: number): { data?: string } => {
        if (hasMeta) {
          const RE = /{([\d,-]+)}/;
          const metadata = node?.data?.meta?.replace(/\s/g, "") || "";
          const strlineNumbers = RE?.test(metadata)
            ? RE?.exec(metadata)![1]
            : "0";
          const highlightLines = rangeParser(strlineNumbers);
          return highlightLines.includes(lineNumber)
            ? { data: "highlight" }
            : {};
        } else {
          return {};
        }
      };

      return hasLang ? (
        <SyntaxHighlighter
          style={syntaxTheme}
          language={hasLang[1]}
          PreTag="div"
          className="codeStyle"
          showLineNumbers={true}
          wrapLines={!!hasMeta}
          useInlineStyles={true}
          lineProps={applyHighlights}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      ) : (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  } as Components;

  return (
    <ReactMarkdown components={MarkdownComponents}>{markdown}</ReactMarkdown>
  );
});

export default Markdown;
