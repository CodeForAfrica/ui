import React from 'react';
import PropTypes from 'prop-types';

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
