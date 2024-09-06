import MuiLink from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import NextLink from "next/link";
import PropTypes from "prop-types";
import React from "react";

import isExternalUrl from "@/commons-ui/next/utils/isExternalUrl";

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled("a")({});

export const NextLinkComposed = React.forwardRef(
  function NextLinkComposed(props, ref) {
    const {
      linkAs,
      locale,
      prefetch,
      legacyBehavior = true,
      replace,
      scroll,
      shallow,
      to,
      ...other
    } = props;

    return (
      <NextLink
        as={linkAs}
        href={to}
        legacyBehavior={legacyBehavior}
        locale={locale}
        passHref
        prefetch={prefetch}
        replace={replace}
        scroll={scroll}
        shallow={shallow}
      >
        <Anchor ref={ref} {...other} />
      </NextLink>
    );
  },
);

NextLinkComposed.propTypes = {
  href: PropTypes.string,
  legacyBehavior: PropTypes.bool,
  linkAs: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  locale: PropTypes.string,
  passHref: PropTypes.bool,
  prefetch: PropTypes.bool,
  replace: PropTypes.bool,
  scroll: PropTypes.bool,
  shallow: PropTypes.bool,
  to: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
};

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/api-reference/next/link
const Link = React.forwardRef(function Link(props, ref) {
  const {
    as,
    className,
    href,
    legacyBehavior,
    linkAs: linkAsProp,
    locale,
    noLinkStyle,
    prefetch,
    replace,
    role, // Link don't have roles.
    scroll,
    shallow,
    ...other
  } = props;

  const isExternal = isExternalUrl(href);
  if (isExternal) {
    const externalLinkProps = {
      href,
      rel: "noreferrer noopener",
      target: "_blank",
      ...other,
    };
    if (noLinkStyle) {
      return <Anchor className={className} {...externalLinkProps} ref={ref} />;
    }
    return <MuiLink className={className} {...externalLinkProps} ref={ref} />;
  }

  const linkAs = linkAsProp || as;
  const nextjsProps = {
    to: href,
    linkAs,
    replace,
    scroll,
    shallow,
    prefetch,
    legacyBehavior,
    locale,
  };

  if (noLinkStyle) {
    return (
      <NextLinkComposed
        {...nextjsProps}
        {...other}
        className={className}
        ref={ref}
      />
    );
  }
  return (
    <MuiLink
      {...nextjsProps}
      {...other}
      component={NextLinkComposed}
      className={className}
      ref={ref}
    />
  );
});

Link.propTypes = {
  as: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.string,
  href: PropTypes.string,
  legacyBehavior: PropTypes.bool,
  linkAs: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  locale: PropTypes.string,
  noLinkStyle: PropTypes.bool,
  prefetch: PropTypes.bool,
  replace: PropTypes.bool,
  role: PropTypes.string,
  scroll: PropTypes.bool,
  shallow: PropTypes.bool,
};

export default Link;
