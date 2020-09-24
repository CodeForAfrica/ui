export default {
  statusTypes: [
    {
      name: "Completed",
      slug: "completed",
      description: "The promise is mostly or completely fulfilled.",
    },
    {
      name: "In progress",
      slug: "in-progress",
      description: "The promise is in the works or being considered.",
    },
    {
      name: "Stalled",
      slug: "stalled",
      description:
        "Could occur due to inaction by administration or lack of support from legislative branch.",
    },
    {
      name: "Delayed",
      slug: "delayed",
      description:
        "No progress, perhaps due to financial limitations, opposition from lawmakers or a change in priorities.",
    },
    {
      name: "Unrated",
      slug: "unrated",
      description:
        "Every promise begins at this level and retains this rating until evidence of progress or proof that it has been shelved.",
    },
    {
      name: "Unstarted",
      slug: "unstarted",
      description:
        "The promise is accomplished only in part, but has succeeded at least in part consistently with the goal of the promise.",
    },
  ],
};
