import React from 'react';

import PropTypes from 'prop-types';

/* eslint import/no-unresolved: */
// Solve false positive issues with eslint
import Footer from './Footer';
import Navigation from './Navigation';

function Page({ children }) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}
Page.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Page;
