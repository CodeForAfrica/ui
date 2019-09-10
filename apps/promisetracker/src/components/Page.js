import React from 'react';
import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet';

import Header from './Navigation';
import Footer from './Footer';

function Page({ children, title: propTitle }) {
  const title = propTitle ? `${propTitle} | Takwimu` : 'Takwimu';

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header />
      {children}
      <Footer />
    </>
  );
}

Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  title: PropTypes.string
};

Page.defaultProps = {
  title: undefined
};

export default Page;
