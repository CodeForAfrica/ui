import React from 'react';
import Page from '../components/Page';
import PromisesSection from './sections/PromisesSection';
import PromiseStatusIndicatorsSection from './sections/PromiseStatusIndicatorsSection';
import PartnersSection from './sections/PartnersSection';
import LatestReportsSection from './sections/LatestReportsSection';
import ContributeSection from './sections/ContributeSection';

function Home() {
  return (
    <Page>
      <PromiseStatusIndicatorsSection />
      <PromisesSection enableShowMore disableFilterHistory />
      <LatestReportsSection />
      <ContributeSection />
      <PartnersSection />
    </Page>
  );
}

export default Home;
