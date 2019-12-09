import React from 'react';

import { useRouter } from 'next/router';

import withApollo from 'lib/withApollo';
import ChartSection from 'components/PageSections/ChartSection';
import ContributeSection from 'components/PageSections/ContributeSection';
import LatestReportsSection from 'components/PageSections/LatestReportSection';
import Page from 'components/Page';
import PartnersSection from 'components/PageSections/PartnerSections';
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

export default withApollo(Index);
