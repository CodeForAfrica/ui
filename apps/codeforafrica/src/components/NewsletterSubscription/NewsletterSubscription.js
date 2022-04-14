import { RichTypography } from "@commons-ui/core";
import { styled } from "@mui/material/styles";
import React from "react";

const NewsletterSubscriptionRoot = styled(RichTypography)(({ theme }) => ({
  color: theme.palette.text.primary,
  "& #mc_embed_signup": {
    backgroundColor: "unset",
    color: "inherit",
  },
}));

/**
 * Section is a special Container that uses theme.contentWidths to set the
 * max-width of the container instead of using the full breakpoints values.
 * This is only applicable when fixed is true.
 */
const NewsletterSubscription = React.forwardRef(function NewsletterSubscription(
  props,
  ref
) {
  return <NewsletterSubscriptionRoot {...props} ref={ref} />;
});

export default NewsletterSubscription;
