import React from 'react';

import { useRouter } from 'next/router';

import Page from 'components/Page';

import PartnersSection from 'components/PageSections/PartnerSections';
import ContributeSection from 'components/PageSections/ContributeSection';
import LatestReportsSection from 'components/PageSections/LatestReportSection';
import ChartSection from 'components/PageSections/ChartSection';
import PromisesSection from 'components/PageSections/PromisesSection';

function Index() {
  const router = useRouter();
  const { status = '', term = '', topic = '' } = router.query;
  const filter = { status, term, topic };

  return (
    <Page>
      <ChartSection />
      <PromisesSection filter={filter} />
      <LatestReportsSection />
      <ContributeSection />
      <PartnersSection />
    </Page>
  );
}

export default Index;
