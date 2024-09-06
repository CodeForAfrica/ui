/* eslint-env browser */
import clsx from "clsx";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import Link from "./Link";

function checkIfPathsMatch(linkPath, currentPath) {
  return linkPath === currentPath;
}

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/api-reference/next/link
const PageRouterLink = React.forwardRef(
  function PageRouterLinkLink(props, ref) {
    const {
      activeClassName,
      as,
      className: classNameProp,
      href,
      isActive: isActiveProp,
      linkAs: linkAsProp,
      locale,
      scroll,
      ...other
    } = props;

    const { asPath, isReady } = useRouter();
    const [className, setClassName] = useState(classNameProp);
    const linkAs = linkAsProp || as;
    const isActive = isActiveProp || checkIfPathsMatch;

    useEffect(() => {
      if (isReady) {
        const linkPathname = new URL(linkAs || href, window.location.href)
          .pathname;
        const activePathname = new URL(asPath, window.location.href).pathname;
        const newClassName = clsx(classNameProp, {
          [activeClassName]: isActive(linkPathname, activePathname),
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
      isReady,
      linkAs,
    ]);

    return (
      <Link
        {...other}
        as={as}
        className={className}
        linkAs={linkAsProp}
        ref={ref}
      />
    );
  },
);

PageRouterLink.propTypes = {
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

export default PageRouterLink;
