import React from "react";

import RichText from "@/civicsignalblog/components/RichText";

const LongFormRichText = React.forwardRef((props, ref) => {
  const { richTextBlockFields: { content } = {} } = props;

  return (
    <RichText
      elements={content}
      sx={(theme) => ({
        color: "inherit",
        "& a, & a:visited, & a:hover": {
          color: "inherit",
        },
        "& h1": {
          ...theme.typography.h1,
          mb: 3.75,
          mt: 5,
        },
        "& h2": {
          mb: 2.5,
          mt: 5,
          ...theme.typography.h2,
        },
        "& h3": {
          mb: 1.25,
          mt: 5,
          ...theme.typography.h3,
        },
        "& h4": {
          mb: 1.25,
          mt: 5,
          ...theme.typography.h4,
        },
        "& h5": {
          mb: 1.25,
          mt: 5,
          ...theme.typography.h5Small,
          [theme.breakpoints.up("md")]: {
            ...theme.typography.h5,
          },
        },
        "& h6": {
          mb: 1.25,
          mt: 5,
          ...theme.typography.h6,
        },
        "& p": {
          ...theme.typography.body1,
          mb: 2,
          [theme.breakpoints.up("md")]: {
            ...theme.typography.body3,
          },
        },
        "& a": {
          font: "inherit",
          margin: "inherit",
        },
        "& ul": {
          mb: 2,
        },
        "& li": {
          ...theme.typography.body1,
          mt: 1,
          [theme.breakpoints.up("md")]: {
            ...theme.typography.body3,
          },
        },
        "& :last-child": {
          mb: 0,
        },
      })}
      ref={ref}
    />
  );
});

export default LongFormRichText;
