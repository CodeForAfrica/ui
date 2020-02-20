export default {
  title: 'PromiseTracker',
  url: 'https://promisetracker.pesacheck.org/',
  GRAPHQL_URI: 'https://check-api.checkmedia.org/api/graphql',
  PROXY_URL: 'https://corsanywhere.devops.codeforafrica.org/',
  CHECK_PROJECT_DB_ID: 2831,
  CHECK_PROMISE_VERIFICATION_STATUS: 'verified',
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
      light: '#377bbf',
      dark: 'rgb(50, 112, 174)'
    },
    unstarted: {
      light: '#7b4b94',
      dark: 'rgb(112, 68, 135)'
    },
    'in-progress': {
      light: '#2a9d8f',
      dark: 'rgb(38, 143, 130)'
    },
    'behind-schedule': {
      light: '#f25f5c',
      dark: 'rgb(221, 87, 84)'
    },
    stalled: {
      light: '#edae49',
      dark: 'rgb(216, 159, 67)'
    },
    inconclusive: {
      light: '#9b9b9b',
      dark: 'rgb(141, 141, 141)'
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
