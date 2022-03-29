/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-has-content */
import { Link as MuiLink } from "@mui/material";
import clsx from "clsx";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { forwardRef } from "react";

import NextComposed from "./NextComposed";

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
const Link = forwardRef(function Link(props, ref) {
  const {
    href,
    activeClassName = "active",
    className: classNameProps,
    naked,
    ...other
  } = props;

  const router = useRouter();
  const pathname = typeof href === "string" ? href : href?.pathname;
  const className = clsx(classNameProps, {
    [activeClassName]: router?.pathname === pathname && activeClassName,
  });

  const formattedHref = href;

  const isRelative =
    typeof formattedHref === "string" &&
    (formattedHref.indexOf("/") === 0 || formattedHref.indexOf("#") === 0) &&
    formattedHref.indexOf("//") !== 0;

  if (!isRelative) {
    const noProtocol = href?.startsWith("www.");
    return (
      <a
        href={noProtocol ? `https://${href}` : href}
        className={className}
        ref={ref}
        {...other}
      />
    );
  }

  if (naked) {
    return (
      <NextComposed
        className={className}
        ref={ref}
        href={formattedHref}
        {...other}
      />
    );
  }
  return (
    <MuiLink
      component={NextComposed}
      className={className}
      ref={ref}
      href={formattedHref}
      {...other}
    />
  );
});

Link.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  className: PropTypes.string,
  href: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  naked: PropTypes.bool,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool,
};

Link.defaultProps = {
  activeClassName: undefined,
  as: undefined,
  className: undefined,
  href: undefined,
  naked: undefined,
  onClick: undefined,
  prefetch: undefined,
};

export default Link;
