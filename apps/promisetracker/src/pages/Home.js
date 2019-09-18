import React from 'react';
import { Grid } from '@material-ui/core';
import Page from '../components/Page';
import PromisesSection from './sections/PromisesSection';
import PromiseStatusIndicatorsSection from './sections/PromiseStatusIndicatorsSection';
import PromiseCard from '../components/PromiseCard';
import Partners from '../components/Partners'

function Home() {
  return (
    <Page>
      <PromiseStatusIndicatorsSection />
      <PromisesSection enableShowMore disableFilterHistory>
        <Grid item xs={12} sm={6} md={4}>
          <PromiseCard
            status="stalled"
            title="Assuring equal rights for all Iranian ethnicities"
            term="Term 1"
            topic="Domestic policy"
            href="/promises/assuring-equal-rights-for-all-iranian-ethnicities"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <PromiseCard
            status="achieved"
            title="Provide commodity subsidies for basic goods to support households with low income"
            term="Term 1"
            topic="Domestic policy"
            href="/promises/provide-commodity-subsidies-for-basic-goods-to-support-households-with-low-income"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <PromiseCard
            status="inactive"
            title="Assuring equal rights for all Iranian ethnicities"
            term="Term 1"
            topic="Domestic policy"
            href="/promises/assuring-equal-rights-for-all-iranian-ethnicities"
          />
        </Grid>
      </PromisesSection>
      <LatestArticlesSection />
      <ContributeSection />
      <Partners />
    </Page>
  );
}

export default Home;
