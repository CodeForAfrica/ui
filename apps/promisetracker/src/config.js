export default {
  title: 'PromiseTracker',
  url: 'https://promisetracker.pesacheck.org/',
  GRAPHQL_URI: 'https://check-api.checkmedia.org/api/graphql',
  reports: {
    url: 'https://pesacheck.org/tagged/promise-tracker'
  },
  colors: {
    achieved: {
      light: '#377bbf',
      dark: 'rgb(50, 112, 174)'
    },
    compromised: {
      light: '#7b4b94',
      dark: 'rgb(112, 68, 135)'
    },
    'in-progress': {
      light: '#2a9d8f',
      dark: 'rgb(38, 143, 130)'
    },
    'not-achieved': {
      light: '#f25f5c',
      dark: 'rgb(221, 87, 84)'
    },
    stalled: {
      light: '#edae49',
      dark: 'rgb(216, 159, 67)'
    },
    inactive: {
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
