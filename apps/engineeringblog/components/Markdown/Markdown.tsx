// Addapted from https://amirardalan.com/blog/syntax-highlight-code-in-markdown
import { FC } from "react";
import ReactMarkdown, { Components } from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import tsx from "react-syntax-highlighter/dist/cjs/languages/prism/tsx";
import typescript from "react-syntax-highlighter/dist/cjs/languages/prism/typescript";
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import scss from "react-syntax-highlighter/dist/cjs/languages/prism/scss";
import bash from "react-syntax-highlighter/dist/cjs/languages/prism/bash";
import markdown from "react-syntax-highlighter/dist/cjs/languages/prism/markdown";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";

import rangeParser from "parse-numeric-range";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

SyntaxHighlighter.registerLanguage("tsx", tsx);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("scss", scss);
SyntaxHighlighter.registerLanguage("bash", bash);
SyntaxHighlighter.registerLanguage("markdown", markdown);
SyntaxHighlighter.registerLanguage("json", json);
SyntaxHighlighter.registerLanguage("js", javascript);

type MarkdownProps = {
  markdown: string;
};

const Markdown: FC<MarkdownProps> = ({ markdown }) => {
  const syntaxTheme = oneDark;

  const MarkdownComponents: Components = {
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
};

export default Markdown;
