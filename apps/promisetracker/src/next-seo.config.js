import config from 'config';

export default {
  title: 'Promise Tracker',
  description:
    'PromiseTracker is a platform-based promise tracker where Kenyan citizens can track various promises made by governors in their manifestos and during the campaigns leading up to the 2017 general election',
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://promisetracker.codeforafrica.org/',
    title: 'Promise tracker',
    description:
      'PromiseTracker, is a tool to help journalists and civil society watchdogs more easily track campaign promises and other political / government pledges',
    site_name: 'Promise Tracker',
    images: [
      {
        url: `${config.url}images/openGraph.png`,
        width: 800,
        height: 600,
        alt: 'Promise tracker'
      }
    ]
  },
  twitter: {
    handle: '@PesaCheck',
    site: '@PesaCheck',
    cardType: 'summary_large_image'
  }
};
