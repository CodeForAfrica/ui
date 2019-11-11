export default {
  statusTypes: [
    {
      slug: 'achieved',
      name: 'Achieved'
    },
    {
      slug: 'compromised',
      name: 'Compromised'
    },
    {
      slug: 'in-progress',
      name: 'In Progress'
    },
    {
      slug: 'not-achieved',
      name: 'Not Achieved'
    },
    {
      slug: 'stalled',
      name: 'Stalled'
    },
    {
      slug: 'inactive',
      name: 'Inactive'
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
      term: 'Term 1',
      topic: 'Domestic policy',
      slug: 'assuring-equal-rights-for-all-Iranian-ethnicities',
      status: 'achieved',
      timeline: [
        {
          updated: 'Jul 18, 2019',
          status: 'compromised'
        },
        {
          updated: 'Jul 10, 2017',
          status: 'inactive'
        }
      ]
    },
    {
      title: 'Providing affordable housing and controlling the housing prices',
      term: 'Term 2',
      topic: 'Economy',
      slug: 'providing-affordable-housing-and-controlling-the-housing-prices',
      status: 'not-achieved',
      timeline: [
        {
          updated: 'Jul 18, 2019',
          status: 'compromised'
        }
      ]
    },
    {
      title:
        'Provide commodity subsidies for basic goods to support households with low income',
      term: 'Term 3',
      topic: 'Social-Cultural',
      slug:
        'provide-commodity-subsidies-for-basic-goods-to-support-households-with-low-income',
      status: 'compromised',
      timeline: [
        {
          updated: 'Jul 18, 2019',
          status: 'compromised'
        }
      ]
    },
    {
      title: 'Instructing literature of minority languages in schools',
      term: 'Term 2',
      topic: 'Domestic policy',
      slug: 'instructing-literature-of-minority-languages-in-schools',
      status: 'inactive',
      timeline: [
        {
          updated: 'Jul 26, 2019',
          status: 'compromised'
        },
        {
          updated: 'Jul 20, 2018',
          status: 'achieved'
        },
        {
          updated: 'Jul 20, 2018',
          status: 'inactive'
        }
      ]
    },
    {
      title: 'An annual increase of one million foreign tourists',
      term: 'Term 1',
      topic: 'Economy',
      slug: 'an-annual-increase-of-one-million-foreign-tourists',
      status: 'in-progress',
      timeline: [
        {
          updated: 'Jul 18, 2019',
          status: 'compromised'
        },
        {
          updated: 'Jul 10, 2017',
          status: 'stalled'
        }
      ]
    },
    {
      title: 'Provide insurance for women who are primary caregivers',
      term: 'Term 3',
      topic: 'Social-Cultural',
      slug: 'provide-insurance-for-women-who-are-primary-caregivers',
      status: 'stalled',
      timeline: [
        {
          updated: 'Dec 18, 2017',
          status: 'in-progress'
        },
        {
          updated: 'Nov 10, 2017',
          status: 'compromised'
        },
        {
          updated: 'Jan 10, 2018',
          status: 'inactive'
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
      status: 'achieved',
      name: 'Achieved',
      value: 14,
      img: './status-achieved.png'
    },
    {
      status: 'compromised',
      name: 'Compromised',
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
      status: 'not-achieved',
      name: 'Not Achieved',
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
      status: 'inactive',
      name: 'Inactive',
      value: 10,
      img: './status-inactive.png'
    }
  ]
};
