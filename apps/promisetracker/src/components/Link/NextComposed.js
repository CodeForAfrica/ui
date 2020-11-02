/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import PropTypes from "prop-types";
import NextLink from "next/link";

const NextComposed = React.forwardRef(function NextComposed(props, ref) {
  const { as, href, locale, prefetch, ...other } = props;

  return (
    <NextLink as={as} href={href} locale={locale} prefetch={prefetch}>
      <a ref={ref} {...other} />
    </NextLink>
  );
});

NextComposed.propTypes = {
  as: PropTypes.string,
  href: PropTypes.string,
  locale: PropTypes.string,
  prefetch: PropTypes.bool,
};

NextComposed.defaultProps = {
  as: undefined,
  href: undefined,
  locale: undefined,
  prefetch: undefined,
};

export default NextComposed;
