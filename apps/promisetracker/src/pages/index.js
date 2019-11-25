import React from 'react';

import Page from 'components/Page';

import PartnersSection from 'components/PageSections/PartnerSections';
import ContributeSection from 'components/PageSections/ContributeSection';
// import LatestReportsSection from 'components/PageSections/LatestReportSection';
import ChartSection from 'components/PageSections/ChartSection';
// import PromisesSection from 'components/PageSections/PromisesSection';

const Index = () => (
  <Page>
    <ChartSection />
    {/* <PromisesSection /> */}
    {/* <LatestReportsSection /> */}
    <ContributeSection />
    <PartnersSection />
  </Page>
);

export default Index;
