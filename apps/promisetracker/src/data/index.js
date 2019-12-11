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
      name: 'In-progress'
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
    },
    {
      slug: '',
      name: 'Unresolved'
    }
  ],
  topics: [
    {
      slug: 'nairobi',
      name: 'Nairobi'
    },
    {
      slug: 'traffic-management',
      name: 'Traffic Management'
    },
    {
      slug: 'governance',
      name: 'Governance'
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

  chartPromises: [
    {
      status: 'complete',
      name: 'Complete',
      value: 14,
      img: './status-achieved.png'
    },
    {
      status: 'unstarted',
      name: 'Unstarted',
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
