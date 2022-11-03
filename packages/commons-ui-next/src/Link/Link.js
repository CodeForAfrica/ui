/* eslint-env browser */
import MuiLink from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import isExternalUrl from "@/commons-ui/next/utils/isExternalUrl";

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled("a")({});

export const NextLinkComposed = React.forwardRef(function NextLinkComposed(
  props,
  ref
) {
  const { linkAs, locale, prefetch, replace, scroll, shallow, to, ...other } =
    props;

  return (
    <NextLink
      as={linkAs}
      href={to}
      legacyBehavior
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
});

NextLinkComposed.propTypes = {
  href: PropTypes.string,
  linkAs: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  locale: PropTypes.string,
  passHref: PropTypes.bool,
  prefetch: PropTypes.bool,
  replace: PropTypes.bool,
  scroll: PropTypes.bool,
  shallow: PropTypes.bool,
};

NextLinkComposed.defaultProps = {
  href: undefined,
  linkAs: undefined,
  locale: undefined,
  passHref: undefined,
  prefetch: undefined,
  replace: undefined,
  scroll: undefined,
  shallow: undefined,
};

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/api-reference/next/link
const Link = React.forwardRef(function Link(props, ref) {
  const {
    activeClassName = "active",
    as,
    className: classNameProp,
    href,
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

  const { asPath, isReady } = useRouter();
  const [className, setClassName] = useState(classNameProp);
  const linkAs = linkAsProp || as;

  useEffect(() => {
    if (isReady) {
      const linkPathname = new URL(linkAs || href, window.location.href)
        .pathname;
      const activePathname = new URL(asPath, window.location.href).pathname;
      const newClassName = clsx(classNameProp, {
        [activeClassName]: linkPathname === activePathname,
      });

      if (newClassName !== className) {
        setClassName(newClassName);
      }
    }
  }, [asPath, isReady, linkAs, href, classNameProp, activeClassName, setClassName, className]);

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

  const nextjsProps = {
    to: href,
    linkAs,
    replace,
    scroll,
    shallow,
    prefetch,
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
  activeClassName: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.string,
  href: PropTypes.string,
  linkAs: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  locale: PropTypes.string,
  noLinkStyle: PropTypes.bool,
  prefetch: PropTypes.bool,
  replace: PropTypes.bool,
  role: PropTypes.string,
  scroll: PropTypes.bool,
  shallow: PropTypes.bool,
};

Link.defaultProps = {
  activeClassName: undefined,
  as: undefined,
  className: undefined,
  href: undefined,
  linkAs: undefined,
  locale: undefined,
  noLinkStyle: undefined,
  prefetch: undefined,
  replace: undefined,
  role: undefined,
  scroll: undefined,
  shallow: undefined,
};

export default Link;
