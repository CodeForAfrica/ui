export default {
  title: 'PromiseTracker',
  url: 'https://promisetracker.pesacheck.org/',
  GRAPHQL_URI: 'https://check-api.checkmedia.org/api/graphql',
  PROXY_URL: 'https://corsanywhere.devops.codeforafrica.org/',
  CHECK_PROJECT_DB_ID: 2831,
  CHECK_PROMISE_MAX_COUNT: 150,
  reports: {
    url: 'https://pesacheck.org/tagged/promise-tracker'
  },
  status: {
    label: `What is the status of the promise?`
  },
  term: {
    label: 'What term was the elected official serving when making the promise?'
  },
  colors: {
    complete: {
      light: '#4cae4e',
      dark: '#1bad1e'
    },
    unstarted: {
      light: '#1f72a3',
      dark: '#0067a3'
    },
    'in-progress': {
      light: '#f7dc71',
      dark: '#f8ca0f'
    },
    'behind-schedule': {
      light: '#f7a02e',
      dark: '#f7971d'
    },
    stalled: {
      light: '#ed756d',
      dark: '#ee4538'
    },
    inconclusive: {
      light: '#9b9b9b',
      dark: '#8d8d8d'
    }
  },

  // Social
  twitter: {
    title: 'PesaCheck Twitter',
    url: 'https://twitter.com/PesaCheck'
  },
  facebook: {
    title: 'PesaCheck Facebook',
    url: 'https://facebook.com/PesaCheck'
  },
  github: {
    url: 'https://github.com/CodeForAfrica/PromiseTracker'
  },
  openafrica: {
    url: 'https://openafrica.net/organization/pesacheck'
  }
};
