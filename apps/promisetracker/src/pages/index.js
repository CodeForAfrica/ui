import React from 'react';

import { useRouter } from 'next/router';

import withApollo from 'lib/withApollo';
import ContributeSection from 'components/PageSections/ContributeSection';
import LatestReportsSection from 'components/PageSections/LatestReportSection';
import Page from 'components/Page';
import PartnersSection from 'components/PageSections/PartnerSections';
import PromisesSection from 'components/PageSections/PromisesSection';
import StatusPieChart from 'components/StatusPieChart';

function Index() {
  const router = useRouter();
  const { status = '', term = '', topic = '' } = router.query;
  const filter = { status, term, topic };

  return (
    <Page>
      <StatusPieChart />
      <PromisesSection filter={filter} />
      <LatestReportsSection />
      <ContributeSection />
      <PartnersSection />
    </Page>
  );
}

export default withApollo(Index);
