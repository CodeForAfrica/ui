export default {
  statusTypes: [
    {
      slug: 'complete',
      name: 'Complete',
      img: './status-complete.png',
      description: 'The promise is mostly or completely fulfilled.'
    },
    {
      slug: 'unstarted',
      name: 'Unstarted',
      img: './status-unstarted.png',
      description:
        'When promises are accomplished less than the original promise but when there is still a significant accomplishment that is consistent with the goal of the original promise.'
    },
    {
      slug: 'in-progress',
      name: 'In Progress',
      img: './status-in-progress.png',
      description: ' The promise is in the works or is being considered.'
    },
    {
      slug: 'behind-schedule',
      name: 'Behind Schedule',
      img: './status-behind-schedule.png',
      description:
        'This could occur because of inaction by the administration or lack of support from the legislative branch or other groups and factors that was critical for the promise to be fulfilled.This rating doesnot necessarily mean that the administration failed to push for its fulfilment'
    },
    {
      slug: 'stalled',
      name: 'Stalled',
      img: './status-stalled.png',
      description:
        'There is no movement on the promise, perhaps because of financial limitations, opposition from lawmakers or higher ranks or a change in priorities'
    },
    {
      slug: 'inconclusive',
      name: 'Inconclusive',
      img: './status-inconclusive.png',
      description:
        'Every promise begins at this level and retains this rating until we see evidence of progress or evidence that the promise has been shelved.'
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
      slug: 'environment-and-sanitation',
      name: 'Environment and Sanitation'
    },
    {
      slug: 'health',
      name: 'Health'
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
