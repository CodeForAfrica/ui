"use client";

/* eslint-env browser */
import clsx from "clsx";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import StyledLink from "./StyledLink";

import isExternalUrl from "@/commons-ui/next/utils/isExternalUrl";

function checkIfPathsMatch(linkPath, currentPath) {
  return linkPath === currentPath;
}

const PagesRouterLink = React.forwardRef(
  function PagesRouterLinkLink(props, ref) {
    const {
      activeClassName = "active",
      as,
      className: classNameProp,
      href,
      isActive: isActiveProp,
      linkAs: linkAsProp,
      ...other
    } = props;

    const { asPath, isReady } = useRouter();
    const [className, setClassName] = useState(classNameProp);
    const isActive = isActiveProp || checkIfPathsMatch;
    const isInternalLink = !isExternalUrl(
      typeof href === "string" ? href : href.pathname,
    );
    const linkAs = linkAsProp || as;

    useEffect(() => {
      if (isReady && isInternalLink) {
        const linkPathname = new URL(linkAs || href, window.location.href)
          .pathname;
        const currentPathname = new URL(asPath, window.location.href).pathname;
        const newClassName = clsx(classNameProp, {
          [activeClassName]: isActive(linkPathname, currentPathname),
        });
        if (newClassName !== className) {
          setClassName(newClassName);
        }
      }
    }, [
      activeClassName,
      asPath,
      className,
      classNameProp,
      href,
      isActive,
      isInternalLink,
      isReady,
      linkAs,
    ]);

    return (
      <StyledLink
        {...other}
        as={as}
        className={className}
        href={href}
        linkAs={linkAsProp}
        ref={ref}
      />
    );
  },
);

PagesRouterLink.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  className: PropTypes.string,
  href: PropTypes.string,
  isActive: PropTypes.func,
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

export default PagesRouterLink;
