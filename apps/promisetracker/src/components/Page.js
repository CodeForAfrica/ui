import React from 'react';

import { Helmet } from 'react-helmet';

import Header from './Navigation';
import Footer from './Footer';
import propTypes from './propTypes';

function Page({ children, title: propTitle, fixNavigation }) {
  const title = propTitle
    ? `${propTitle} | Promise Tracker`
    : 'Promise Tracker';

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Header fixed={fixNavigation} />
      {children}
      <Footer />
    </>
  );
}

Page.propTypes = {
  fixNavigation: propTypes.bool,
  children: propTypes.children.isRequired,
  title: propTypes.string
};

Page.defaultProps = {
  fixNavigation: true,
  title: undefined
};

export default Page;
