import React from 'react';

import { useRouter } from 'next/router';

import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import withApollo from 'lib/withApollo';
import ChartSection from 'components/PageSections/ChartSection';
import ContributeSection from 'components/PageSections/ContributeSection';
import LatestReportsSection from 'components/PageSections/LatestReportSection';
import Page from 'components/Page';
import PartnersSection from 'components/PageSections/PartnerSections';
import PromisesSection from 'components/PageSections/PromisesSection';

const GET_TEAM = gql`
  query {
    team(slug: "pesacheck-promise-tracker") {
      name
    }
  }
`;

function Index() {
  const router = useRouter();
  const { status = '', term = '', topic = '' } = router.query;
  const filter = { status, term, topic };

  const { loading, error, data } = useQuery(GET_TEAM);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return null;
  }
  return (
    <Page>
      <h1>{data.team.name}</h1>
      <ChartSection />
      <PromisesSection filter={filter} />
      <LatestReportsSection />
      <ContributeSection />
      <PartnersSection />
    </Page>
  );
}

export default withApollo(Index);
