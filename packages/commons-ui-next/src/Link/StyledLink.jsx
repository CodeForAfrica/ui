"use client";

import MuiLink from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import NextLink from "next/link";
import PropTypes from "prop-types";
import React from "react";

import isExternalUrl from "@/commons-ui/next/utils/isExternalUrl";

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled("a")({});

const NextLinkComposed = React.forwardRef(
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
const StyledLink = React.forwardRef(function Link(props, ref) {
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

  // https://nextjs.org/docs/app/api-reference/components/link#href-required
  const url = typeof href === "string" ? href : href?.pathname;
  const isExternal = isExternalUrl(url);
  if (isExternal) {
    const externalLinkProps = {
      href,
      rel: "noreferrer noopener",
      target: "_blank",
      ...other,
    };
    const LinkComponent = noLinkStyle ? Anchor : MuiLink;
    return (
      <LinkComponent className={className} {...externalLinkProps} ref={ref} />
    );
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

  const LinkComponent = noLinkStyle ? NextLinkComposed : MuiLink;
  const component = noLinkStyle ? undefined : NextLinkComposed;
  return (
    <LinkComponent
      {...nextjsProps}
      {...other}
      component={component}
      className={className}
      ref={ref}
    />
  );
});

StyledLink.propTypes = {
  as: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.string,
  href: PropTypes.string.isRequired,
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

export default StyledLink;
