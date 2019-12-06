export default {
  statusTypes: [
    {
      slug: 'complete',
      name: 'Complete'
    },
    {
      slug: 'unstarted',
      name: 'Unstarted'
    },
    {
      slug: 'in-progress',
      name: 'In Progress'
    },
    {
      slug: 'behind-schedule',
      name: 'Behind Schedule'
    },
    {
      slug: 'stalled',
      name: 'Stalled'
    },
    {
      slug: 'inconclusive',
      name: 'Inconclusive'
    }
  ],
  topics: [
    {
      slug: 'economy',
      name: 'Economy'
    },
    {
      slug: 'foreign-policy',
      name: 'Foreign Policy'
    },
    {
      slug: 'domestic-policy',
      name: 'Domestic Policy'
    },
    {
      slug: 'social-cultural',
      name: 'Social Cultural'
    }
  ],
  terms: [
    {
      slug: 'term-1',
      name: 'Term 1'
    },
    {
      slug: 'term-2',
      name: 'Term 2'
    },
    {
      slug: 'term-3',
      name: 'Term 3'
    }
  ],
  promises: [
    {
      title: 'Assuring equal rights for all Iranian ethnicities',
      term: 'term-1',
      topic: 'domestic-policy',
      slug: 'assuring-equal-rights-for-all-Iranian-ethnicities',
      status: 'complete',
      timeline: [
        {
          updated: 'Jul 18, 2019',
          status: 'complete'
        },
        {
          updated: 'Jul 10, 2017',
          status: 'inconclusive'
        }
      ]
    },
    {
      title: 'Providing affordable housing and controlling the housing prices',
      term: 'term-2',
      topic: 'economy',
      slug: 'providing-affordable-housing-and-controlling-the-housing-prices',
      status: 'behind-schedule',
      timeline: [
        {
          updated: 'Jul 18, 2019',
          status: 'behind-schedule'
        }
      ]
    },
    {
      title:
        'Provide commodity subsidies for basic goods to support households with low income',
      term: 'term-3',
      topic: 'social-cultural',
      slug:
        'provide-commodity-subsidies-for-basic-goods-to-support-households-with-low-income',
      status: 'unstarted',
      timeline: [
        {
          updated: 'Jul 18, 2019',
          status: 'unstarted'
        }
      ]
    },
    {
      title: 'Instructing literature of minority languages in schools',
      term: 'term-2',
      topic: 'domestic-policy',
      slug: 'instructing-literature-of-minority-languages-in-schools',
      status: 'inconclusive',
      timeline: [
        {
          updated: 'Jul 26, 2019',
          status: 'inconclusive'
        },
        {
          updated: 'Jul 20, 2018',
          status: 'behind-schedule'
        },
        {
          updated: 'Jul 20, 2018',
          status: 'inconclusive'
        }
      ]
    },
    {
      title: 'An annual increase of one million foreign tourists',
      term: 'term-1',
      topic: 'economy',
      slug: 'an-annual-increase-of-one-million-foreign-tourists',
      status: 'in-progress',
      timeline: [
        {
          updated: 'Jul 18, 2019',
          status: 'in-progress'
        },
        {
          updated: 'Jul 10, 2017',
          status: 'stalled'
        }
      ]
    },
    {
      title: 'Provide insurance for women who are primary caregivers',
      term: 'term-3',
      topic: 'social-cultural',
      slug: 'provide-insurance-for-women-who-are-primary-caregivers',
      status: 'stalled',
      timeline: [
        {
          updated: 'Dec 18, 2017',
          status: 'in-progress'
        },
        {
          updated: 'Nov 10, 2017',
          status: 'unstarted'
        },
        {
          updated: 'Jan 10, 2018',
          status: 'inconclusive'
        },
        {
          updated: 'Jul 10, 2019',
          status: 'stalled'
        }
      ]
    }
  ],
  chartPromises: [
    {
      status: 'complete',
      name: 'Complete',
      value: 14,
      img: './status-achieved.png'
    },
    {
      status: 'unstarted',
      name: 'unStarted',
      value: 8,
      img: './status-compromised.png'
    },
    {
      status: 'in-progress',
      name: 'In Progress',
      value: 11,
      img: './status-in-progress.png'
    },
    {
      status: 'behind-schedule',
      name: 'Behind Schedulte',
      value: 45,
      img: './status-not-achieved.png'
    },
    {
      status: 'stalled',
      name: 'Stalled',
      value: 12,
      img: './status-stalled.png'
    },
    {
      status: 'inconclusive',
      name: 'In',
      value: 10,
      img: './status-inactive.png'
    }
  ]
};
