import React from "react";

import RichText from "@/charterafrica/components/RichText";

const LongFormRichText = React.forwardRef(function LongFormRichText(
  props,
  ref
) {
  const { richTextBlockFields: { content } = {}, sx } = props;

  return (
    <RichText
      elements={content}
      sx={(theme) => ({
        color: "inherit",
        "& h1": {
          ...theme.typography.h1Small,
          mb: 3.75,
          mt: 5,
          [theme.breakpoints.up("md")]: {
            ...theme.typography.h1,
          },
        },
        "& h2": {
          mb: 2.5,
          mt: 5,
          ...theme.typography.h2Small,
          [theme.breakpoints.up("md")]: {
            ...theme.typography.h2,
          },
        },
        "& h3": {
          mb: 1.25,
          mt: 5,
          ...theme.typography.h3Small,
          [theme.breakpoints.up("md")]: {
            ...theme.typography.h3,
          },
        },
        "& h4": {
          mb: 1.25,
          mt: 5,
          ...theme.typography.h4Small,
          [theme.breakpoints.up("md")]: {
            ...theme.typography.h4,
          },
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
          ...theme.typography.h6Small,
          [theme.breakpoints.up("md")]: {
            ...theme.typography.h6,
          },
        },
        "& p": {
          ...theme.typography.p1,
          mb: 2,
          [theme.breakpoints.up("md")]: {
            ...theme.typography.subheading,
          },
        },
        "& p:last-of-type": {
          mb: 0,
        },
        "& a, & a:visited, & a:hover": {
          color: "inherit",
        },
        ...sx,
      })}
      ref={ref}
    />
  );
});

export default LongFormRichText;
