import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

import { useRouter } from "next/router";

import Button from "@material-ui/core/Button";

import NextComposed from "./NextComposed";

// A styled version of the Next.js Link component:
// https://nextjs.org/docs/#with-link
function ButtonLink(props) {
  const {
    activeClassName = "active",
    className: classNameProps,
    href,
    innerRef,
    locale,
    naked,
    ...other
  } = props;
  const router = useRouter();

  const className = clsx(classNameProps, {
    [activeClassName]:
      router.asPath === href &&
      (!locale || router.locale === locale) &&
      activeClassName,
  });

  if (naked) {
    return (
      <NextComposed
        className={className}
        href={href}
        locale={locale}
        ref={innerRef}
        {...other}
      />
    );
  }

  return (
    <Button
      component={NextComposed}
      className={className}
      href={href}
      locale={locale}
      {...other}
    />
  );
}

ButtonLink.propTypes = {
  activeClassName: PropTypes.string,
  as: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  locale: PropTypes.string,
  naked: PropTypes.bool,
  onClick: PropTypes.func,
  prefetch: PropTypes.bool,
};

ButtonLink.defaultProps = {
  activeClassName: undefined,
  as: undefined,
  className: undefined,
  href: undefined,
  innerRef: undefined,
  locale: undefined,
  naked: undefined,
  onClick: undefined,
  prefetch: undefined,
};

export default React.forwardRef((props, ref) => (
  <ButtonLink {...props} innerRef={ref} />
));
