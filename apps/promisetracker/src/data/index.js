export default {
  statusTypes: [
    {
      slug: 'complete',
      name: 'Complete',
      img: './status-complete.png',
      description: 'The promise has been accomplished.'
    },
    {
      slug: 'unstarted',
      name: 'Unstarted',
      img: './status-unstarted.png',
      description: 'The implementation of the promise has not started'
    },
    {
      slug: 'in-progress',
      name: 'In Progress',
      img: './status-in-progress.png',
      description:
        'The implementation of the promise has started and is still ongoing'
    },
    {
      slug: 'behind-schedule',
      name: 'Behind Schedule',
      img: './status-behind-schedule.png',
      description:
        'The implementation of the promise has started, however its implementation is slower than originally planned and communicated to stakeholders and the public.'
    },
    {
      slug: 'stalled',
      name: 'Stalled',
      img: './status-stalled.png',
      description:
        'The implementation of the promise has started but due to challenges or other circumstances the project has been put on hold. The challenges or circumstances include lack of finances, change of priorities,legal issues, corruption etc'
    },
    {
      slug: 'inconclusive',
      name: 'Inconclusive',
      img: './status-inconclusive.png',
      description:
        'There is not enough data and or information to verify if  the project has been started or its level of implementation inorder to give it a rating.'
    }
  ],
  topics: [
    {
      slug: 'traffic-management',
      name: 'Traffic Management'
    },
    {
      slug: 'governance',
      name: 'Governance'
    },
    {
      slug: 'environment-and-sanitation',
      name: 'Environment and Sanitation'
    },
    {
      slug: 'women',
      name: 'Women'
    },
    {
      slug: 'housing',
      name: 'Housing'
    },
    {
      slug: 'health',
      name: 'Health'
    },
    {
      slug: 'transport',
      name: 'Transport'
    },
    {
      slug: 'jobs-and-business-creation',
      name: 'Jobs and Business Creation'
    },
    {
      slug: 'youth-and-people-with-disabilities',
      name: 'Youth and people with Disabilities'
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
  ]
};
