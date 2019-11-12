
import Page from '../component/Page';

import PartnersSection from '../component/PageSections/PartnerSections';
import ContributeSection from '../component/PageSections/ContributeSection';
import LatestReportsSection from '../component/PageSections/LatestReportSection';
import ChartSection from '../component/PageSections/ChartSection';

const Index = () => (
    <Page>
      <ChartSection />
      <LatestReportsSection />
      <ContributeSection />
      <PartnersSection />
    </Page>
);

export default Index;