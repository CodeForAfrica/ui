import { Stack } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import RichTypography from "@/commons-ui/next/RichTypography";

const newsletterSubscriptionStyles = (theme) => ({
  "& #mc_embed_signup": {
    typography: "body1",
    backgroundColor: "unset",
    color: "inherit",
    width: "100%",
  },
  "& #mc_embed_signup input[type=text], & #mc_embed_signup input[type=email]": {
    typography: "body1",
    border: "1px solid #D0CBCB",
    borderRadius: 0,
    display: "flex",
    height: theme.typography.pxToRem(36),
    marginTop: 0,
    marginBottom: theme.typography.pxToRem(30),
    outline: "none",
    padding: `0 ${theme.typography.pxToRem(12)}`,
    width: "100%",
  },
  "& #mc_embed_signup input::placeholder": {
    color: "#D0CBCB",
    opacity: 1.0,
    WebkitTextFillColor: "#D0CBCB",
  },
  "& #mc_embed_signup input:focus,  #mc_embed_signup textarea:focus": {
    border: `1px solid ${theme.palette?.primary?.main}`,
  },
  "& #mc_embed_signup input:active,  #mc_embed_signup textarea:active": {
    border: `1px solid ${theme.palette?.highlight?.main}`,
  },
  "& #mc_embed_signup input[type=submit]": {
    typography: "subtitle1",
    background: "none",
    border: `1px solid ${theme.palette?.text?.secondary}`,
    color: "inherit",
    padding: `${theme.typography.pxToRem(6)} ${theme.typography.pxToRem(12)}`,
    textDecoration: "none",
  },
  "& #mc_embed_signup input[type=submit]:hover": {
    cursor: "pointer",
    background: theme.palette?.text?.secondary,
    color: theme.palette?.text?.primary,
  },
});

function NewsletterSubscriptionRoot(props) {
  return <RichTypography sx={newsletterSubscriptionStyles} {...props} />;
}

/**
 * Section is a special Container that uses theme.contentWidths to set the
 * max-width of the container instead of using the full breakpoints values.
 * This is only applicable when fixed is true.
 */
const NewsletterSubscription = React.forwardRef(
  function NewsletterSubscription(props, ref) {
    const { children: childrenProp, embedCode, sx, title } = props;
    const children = childrenProp || embedCode;

    if (!children) {
      return null;
    }
    return (
      <Stack
        sx={{
          maxWidth: { md: "200px" },
          ...sx,
        }}
        ref={ref}
      >
        <RichTypography variant="h5SemiBold" sx={{ mb: "30px" }}>
          {title}
        </RichTypography>
        <NewsletterSubscriptionRoot>{children}</NewsletterSubscriptionRoot>
      </Stack>
    );
  },
);

NewsletterSubscription.propTypes = {
  children: PropTypes.node,
  embedCode: PropTypes.node,
};

export default NewsletterSubscription;
