import { RichTypography } from "@commons-ui/next";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React from "react";

const NewsletterSubscriptionRoot = styled(RichTypography)(
  ({ theme: { breakpoints, palette, typography } }) => ({
    "& #mc_embed_signup": {
      ...typography.body1,
      backgroundColor: "unset",
      color: "inherit",
      width: "100%",
    },
    "& #mc_embed_signup .mc-field-group label, #mc_embed_signup .brandingLogo, #mc_embed_signup .indicates-required, #mc_embed_signup h2":
      {
        display: "none",
      },
    "& #mc_embed_signup_scroll": {
      display: "flex",
      flexDirection: "column",
      [breakpoints.up("md")]: {
        flexDirection: "row",
      },
    },
    "#mc_embed_signup form": {
      margin: 0,
      display: "flex",
      justifyContent: "center",
      [breakpoints.up("sm")]: {
        justifyContent: "flex-start",
      },
    },
    "& #mce-EMAIL-HELPERTEXT": {
      display: "none",
    },
    "& #mc_embed_signup input[type=text], & #mc_embed_signup input[type=email]":
      {
        ...typography.body1,
        border: "1px solid #D0CBCB",
        borderRadius: 0,
        display: "flex",
        height: typography.pxToRem(36),
        marginBottom: typography.pxToRem(10),
        outline: "none",
        padding: `0 ${typography.pxToRem(12)}`,
        width: "100%",
      },
    "& #mc_embed_signup input[type=text]": {
      display: "none",
    },
    "& #mc_embed_signup input[type=email]": {
      flex: 1,
      minWidth: "200px",
    },
    "#mc_embed_signup div#mce-responses": {
      display: "none",
    },
    "& #mc_embed_signup input::placeholder": {
      color: "#D0CBCB",
      opacity: 1.0,
      WebkitTextFillColor: "#D0CBCB",
      fontStyle: "italic",
      fontFamily: "Open Sans",
    },
    "#mc_embed_signup .helper_text": {
      display: "none",
    },
    "#mc_embed_signup .mc-field-group": {
      minHeight: 0,
      paddingBottom: 0,
      width: "100%",
    },
    "& #mc_embed_signup input:focus,  #mc_embed_signup textarea:focus": {
      border: `1px solid ${palette.primary.main}`,
    },
    "& #mc_embed_signup input:active,  #mc_embed_signup textarea:active": {},
    "& #mc_embed_signup .clear.foot": {
      display: "flex",
      width: "100%",
      [breakpoints.up("md")]: {
        display: "grid",
        width: "90%",
      },
    },
    "& #mc_embed_signup input[type=submit]": {
      ...typography.p1SemiBold,
      background: "none",
      backgroundColor: "#F7CE46",
      border: "none",
      color: "#3E202C",
      height: typography.pxToRem(36),
      margin: 0,
      minWidth: "98px",
      padding: 0,
      width: "100%",
      [breakpoints.up("md")]: {
        marginLeft: "10px",
        marginRight: "5px",
        width: "auto",
      },
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
        width: { md: "310px" },
        ...sx,
      }}
      ref={ref}
    >
      <RichTypography
        mb={2.5}
        variant="p2SemiBold"
        textAlign={{ xs: "center", sm: "left", md: "right" }}
      >
        {title}
      </RichTypography>
      <NewsletterSubscriptionRoot sx={{ width: 310 }}>
        {children}
      </NewsletterSubscriptionRoot>
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
