import React from 'react';

import { useRouter } from 'next/router';

import Page from 'components/Page';

import PieChartStatusSection from 'components/PageSections/PieChartStatusSection';
import ContributeSection from 'components/PageSections/ContributeSection';
import LatestReportsSection from 'components/PageSections/LatestReportSection';
import PartnersSection from 'components/PageSections/PartnerSections';
import PromisesSection from 'components/PageSections/PromisesSection';

import withApollo from 'lib/withApollo';

function Index() {
  const router = useRouter();
  const { status = '', term = '', topic = '' } = router.query;
  const filter = { status, term, topic };

  return (
    <Page>
      <PieChartStatusSection />
      <PromisesSection filter={filter} />
      <LatestReportsSection />
      <ContributeSection />
      <PartnersSection />
    </Page>
  );
}

export default withApollo(Index);
