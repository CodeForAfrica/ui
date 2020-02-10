import React from 'react';

import { useRouter } from 'next/router';

import Page from 'components/Page';

import PieChartStatusSection from 'components/PageSections/PieChartStatusSection';
import ContributeSection from 'components/PageSections/ContributeSection';
import LatestReportsSection from 'components/PageSections/LatestReportSection';
import PartnersSection from 'components/PageSections/PartnerSections';
import PromisesSection from 'components/PageSections/PromisesSection';

import fetchPromises from 'lib/fetchPromises';

function Index({ promises }) {
  const router = useRouter();
  const { status = '', term = '', topic = '' } = router.query;

  return (
    <Page>
      <PieChartStatusSection promises={promises} />
      <PromisesSection promises={promises} filter={{ status, term, topic }} />
      <LatestReportsSection />
      <ContributeSection />
      <PartnersSection />
    </Page>
  );
}

Index.getInitialProps = fetchPromises.bind(null, { limit: 6 });

export default Index;
