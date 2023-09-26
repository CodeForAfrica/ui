/* eslint-env browser */
import { Section } from "@commons-ui/core";
import PropTypes from "prop-types";
import React from "react";

import RichText from "@/codeforafrica/components/RichText";

function LongFormRichText(props) {
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
        "& ul": {
          mb: 2,
        },
        "& li": {
          ...theme.typography.p1,
          mt: 1,
          [theme.breakpoints.up("md")]: {
            ...theme.typography.subheading,
          },
        },
        "& :last-child": {
          mb: 0,
        },
      })}
    />
  );
}
const CMSContent = React.forwardRef(function CMSContent({ children, sx }, ref) {
  const COMPONENT_BY_CONTENT_TYPE = {
    richText: LongFormRichText,
  };
  return (
    <Section
      component="section"
      sx={{ px: { xs: 2.5, sm: 0 }, ...sx }}
      ref={ref}
    >
      {children.map((c) => {
        const Component = COMPONENT_BY_CONTENT_TYPE[c.blockType];
        if (Component) {
          return <Component {...c} key={c.blockType} />;
        }
        return null;
      })}
    </Section>
  );
});

CMSContent.propTypes = {
  sx: PropTypes.shape({}),
};

CMSContent.defaultProps = {
  sx: undefined,
};

export default CMSContent;
