import MuiLink from "@mui/material/Link";
import { styled } from "@mui/material/styles";
import clsx from "clsx";
import NextLink from "next/link";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import * as React from "react";

// Add support for the sx prop for consistency with the other branches.
const Anchor = styled("a")({});

export const NextLinkComposed = React.forwardRef(function NextLinkComposed(
  props,
  ref
) {
  const {
    to,
    linkAs,
    replace,
    scroll,
    shallow,
    passHref,
    prefetch,
    locale,
    ...other
  } = props;

  return (
    <NextLink
      href={to}
      prefetch={prefetch}
      as={linkAs}
      replace={replace}
      scroll={scroll}
      shallow={shallow}
      passHref
      locale={locale}
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
  to: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
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
    className: classNameProps,
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

  const router = useRouter();
  const pathname = typeof href === "string" ? href : href.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router?.pathname === pathname && activeClassName,
  });

  const isExternal =
    typeof href === "string" &&
    (href.indexOf("http") === 0 || href.indexOf("mailto:") === 0);

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
    locale,
  };

  if (noLinkStyle) {
    return (
      <NextLinkComposed
        className={className}
        ref={ref}
        {...nextjsProps}
        {...other}
      />
    );
  }

  return (
    <MuiLink
      component={NextLinkComposed}
      className={className}
      ref={ref}
      {...nextjsProps}
      {...other}
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
