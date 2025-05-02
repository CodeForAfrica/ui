import React from "react";

import RichText from "@/roboshield/components/RichText";
import { RichTextBlock } from "@/roboshield/components/Content/Content";
import type { Theme } from "@mui/material/styles";

export default function LongFormRichText({ content }: RichTextBlock) {
  return (
    <RichText
      elements={content}
      sx={(theme: Theme) => ({
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
          ...theme.typography.h5,
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
            ...theme.typography.body2,
          },
        },
        "& a": {
          ...theme.typography.body1,
          mb: 2,
          [theme.breakpoints.up("md")]: {
            ...theme.typography.body2,
          },
        },
        "& ul": {
          mb: 2,
        },
        "& li": {
          ...theme.typography.body1,
          mt: 1,
          [theme.breakpoints.up("md")]: {
            ...theme.typography.body2,
          },
        },
        "& :last-child": {
          mb: 0,
        },
      })}
    />
  );
}
