import React from 'react';
import Page from '../components/Page';
import PromisesSection from './sections/PromisesSection';
import PromiseStatusIndicatorsSection from './sections/PromiseStatusIndicatorsSection';

function Home() {
  return (
    <Page>
      <PromiseStatusIndicatorsSection />
      <PromisesSection />
    </Page>
  );
}

export default Home;
