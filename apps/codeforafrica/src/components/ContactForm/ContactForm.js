import { RichTypography, Section } from "@commons-ui/core";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

import sendIconUrl from "@/codeforafrica/assets/icons/Type=send, Size=16, Color=White.svg?url";

const ContactFormRoot = styled(RichTypography)(
  ({ theme: { breakpoints, palette, typography } }) => ({
    "& #mc_embed_signup": {
      ...typography.body1,
      backgroundColor: "unset",
      borderSizing: "border-box",
      color: "#5D5353",
      width: "100%",
    },
    "& #mc_embed_signup .indicates-required": {
      display: "none",
    },
    "& #mc_embed_signup form > div": {
      display: "flex",
      flexFlow: "row wrap",
    },
    "& #mc_embed_signup .mc-field-group": {
      order: 1,
      flexBasis: "100%",
      maxWidth: "100%",
      marginBottom: 14,
      [breakpoints.up("md")]: {
        padding: "0 20px",
        flexBasis: "50%",
        marginBottom: 40,
        maxWidth: "50%",
      },
    },
    "& #mc_embed_signup .mc-field-group:nth-of-type(2n)": {
      [breakpoints.up("md")]: {
        paddingLeft: 0,
      },
    },
    "& #mc_embed_signup .mc-field-group:nth-of-type(2n+1)": {
      [breakpoints.up("md")]: {
        paddingRight: 0,
      },
    },
    "& #mc_embed_signup .mc-field-group:nth-of-type(3)": {
      marginBottom: 40,
      [breakpoints.up("md")]: {
        order: 4,
        paddingLeft: 0,
        paddingRight: 20,
      },
    },
    "& #mc_embed_signup .mc-field-group:nth-of-type(4)": {
      [breakpoints.up("md")]: {
        order: 3,
        paddingLeft: 20,
        paddingRight: 0,
      },
    },
    "& #mc_embed_signup .mc-field-group:nth-of-type(5)": {
      marginBottom: 40,
      [breakpoints.up("md")]: {
        order: 5,
      },
    },
    "& #mc_embed_signup .mc-field-group:nth-of-type(6)": {
      marginBottom: 40,
      [breakpoints.up("md")]: {
        flexBasis: "100%",
        maxWidth: "100%",
        order: 6,
        padding: 0,
      },
    },
    "& #mc_embed_signup .clear": {
      flexBasis: "100%",
      maxWidth: "100%",
      order: 7,
    },
    "& #mc_embed_signup .asterisk": {
      color: "inherit",
    },
    "& #mc_embed_signup .mc-field-group input, & #mc_embed_signup .mc-field-group textarea":
      {
        ...typography.body1,
        border: "1px solid #D0CBCB",
        borderRadius: 0,
        display: "flex",
        height: typography.pxToRem(36),
        outline: "none",
        padding: `6.5px 12px`,
        width: "100%",
      },
    "& #mc_embed_signup .mc-field-group textarea": {
      height: 189,
      resize: "none",
    },
    "& #mc_embed_signup .mc-field-group input::placeholder, & #mc_embed_signup .mc-field-group textarea::placeholder":
      {
        color: "#D0CBCB",
        opacity: 1.0,
        WebkitTextFillColor: "#D0CBCB",
      },
    "& #mc_embed_signup .mc-field-group input:focus,  #mc_embed_signup .mc-field-group textarea:focus":
      {
        border: `1px solid ${palette.primary.main}`,
      },
    "& #mc_embed_signup .mc-field-group input:active,  #mc_embed_signup .mc-field-group textarea:active":
      {
        border: `1px solid ${palette.highlight.main}`,
      },
    "& #mc_embed_signup input.mce_inline_error, & #mc_embed_signup textarea.mce_inline_error":
      {
        border: `1px solid ${palette.error.main}`,
      },
    "& #mc_embed_signup .mce_inline_error": {
      ...typography.body1,
      background: palette.background.default,
      color: palette.error.main,
      margin: 0,
      padding: 0,
    },
    "& #mc_embed_signup button[type=submit]": {
      ...typography.button,
      backgroundColor: palette.primary.main,
      border: "none",
      color: palette.text.secondary,
      // flex
      display: "flex",
      alignItems: "center",
      columnGap: 8,
      justifyContent: "center",

      // spacing
      padding: 24,
      width: "100%",
      [breakpoints.up("md")]: {
        width: "auto",
      },
    },
    "& #mc_embed_signup button[type=submit]::before": {
      content: `url("${sendIconUrl}")`,
      height: 16,
    },
    "& #mc_embed_signup button[type=submit]:hover": {
      cursor: "pointer",
    },
  })
);

/**
 * Section is a special Container that uses theme.contentWidths to set the
 * max-width of the container instead of using the full breakpoints values.
 * This is only applicable when fixed is true.
 */
const ContactForm = React.forwardRef(function ContactForm(props, ref) {
  const { children: childrenProp, embedCode, sx } = props;
  const children = childrenProp || embedCode;

  if (!children) {
    return null;
  }
  return (
    <Section sx={{ px: { xs: 2.5, sm: 0 }, ...sx }} ref={ref}>
      <ContactFormRoot>{children}</ContactFormRoot>
    </Section>
  );
});

ContactForm.propTypes = {
  children: PropTypes.node,
  embedCode: PropTypes.node,
};

ContactForm.defaultProps = {
  children: undefined,
  embedCode: undefined,
};

export default ContactForm;
