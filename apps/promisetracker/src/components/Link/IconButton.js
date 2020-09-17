import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { useRouter } from "next/router";

import { IconButton } from "@material-ui/core";

import NextComposed from "./NextComposed";

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function IconButtonLink(props) {
  const {
    activeClassName = "active",
    className: classNameProps,
    href,
    innerRef,
    naked,
    ...other
  } = props;
  const router = useRouter();

  const className = clsx(classNameProps, {
    [activeClassName]: router.pathname === href && activeClassName,
  });

  if (naked) {
    return (
      <NextComposed
        className={className}
        href={href}
        ref={innerRef}
        {...other}
      />
    );
  }

  return (
    <IconButton
      component={NextComposed}
      className={className}
      href={href}
      ref={innerRef}
      {...other}
    />
  );
}

IconButtonLink.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  naked: PropTypes.bool,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool,
};

IconButtonLink.defaultProps = {
  activeClassName: undefined,
  as: undefined,
  className: undefined,
  href: undefined,
  innerRef: undefined,
  naked: undefined,
  onClick: undefined,
  prefetch: undefined,
};

export default React.forwardRef((props, ref) => (
  <IconButtonLink {...props} innerRef={ref} />
));
