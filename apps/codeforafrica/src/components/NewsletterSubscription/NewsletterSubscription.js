import { RichTypography } from "@commons-ui/next";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

const NewsletterSubscriptionRoot = styled(RichTypography)(
  ({ theme: { palette, typography } }) => ({
    "& #mc_embed_signup": {
      ...typography.body1,
      backgroundColor: "unset",
      color: "inherit",
      width: "100%",
    },
    "& #mc_embed_signup input[type=text], & #mc_embed_signup input[type=email]":
      {
        ...typography.body1,
        border: "1px solid #D0CBCB",
        borderRadius: 0,
        display: "flex",
        height: typography.pxToRem(36),
        marginBottom: typography.pxToRem(30),
        outline: "none",
        padding: `0 ${typography.pxToRem(12)}`,
        width: "100%",
      },
    "& #mc_embed_signup input::placeholder": {
      color: "#D0CBCB",
      opacity: 1.0,
      WebkitTextFillColor: "#D0CBCB",
    },
    "& #mc_embed_signup input:focus,  #mc_embed_signup textarea:focus": {
      border: `1px solid ${palette.primary.main}`,
    },
    "& #mc_embed_signup input:active,  #mc_embed_signup textarea:active": {
      border: `1px solid ${palette.highlight.main}`,
    },
    "& #mc_embed_signup input[type=submit]": {
      ...typography.subtitle1,
      background: "none",
      border: "none",
      color: "inherit",
      padding: 0,
      textDecoration: "underline",
    },
  })
);

/**
 * Section is a special Container that uses theme.contentWidths to set the
 * max-width of the container instead of using the full breakpoints values.
 * This is only applicable when fixed is true.
 */
const NewsletterSubscription = React.forwardRef(function NewsletterSubscription(
  props,
  ref
) {
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
});

NewsletterSubscription.propTypes = {
  children: PropTypes.node,
  embedCode: PropTypes.node,
};

NewsletterSubscription.defaultProps = {
  children: undefined,
  embedCode: undefined,
};

export default NewsletterSubscription;
