import {
  GET_PROMISES,
  GET_PROMISES_BY_CATEGORIES,
} from "@/promisetracker/lib/check/gql";

import config from "@/promisetracker/config";
import promiseImage from "@/promisetracker/assets/promise-thumb-01.png";
import createApolloClient from "./createApolloClient";

const UNSPECIFIED_TEAM = "unspecified";
const CLIENT_PER_TEAM = new Map();

function check(team = undefined, initialState = {}) {
  const clientTeam = team || UNSPECIFIED_TEAM;
  const existingClient = CLIENT_PER_TEAM.get(clientTeam);
  const client = existingClient || createApolloClient(initialState, team);
  if (!existingClient) {
    CLIENT_PER_TEAM.set(clientTeam, existingClient);
  }

  function getTaskfromTasks(tasks, label) {
    return tasks.find((item) => item.node.label === label);
  }

  function findLogByTask(logs, label) {
    return logs.find((item) => item.node.task?.label === label);
  }

  function getassetURL(filename, id) {
    return `${config.CHECK_ASSET_URI}/${id}/${filename.replace(/ /g, "_")}`;
  }

  function getStatus(tasks) {
    const statusTask = getTaskfromTasks(
      tasks,
      "What is the status of the promise?"
    );
    const promiseStatus = config.promiseStatuses.find(
      (status) => status.title === statusTask.node.first_response_value
    );
    const defaultStatus = config.promiseStatuses.find(
      (status) => status.title === "Unrated"
    );
    return promiseStatus || defaultStatus;
  }

  function getImage(logs, tasks) {
    const imageLog = findLogByTask(
      logs,
      "What is the image related to the promise"
    );
    const imageTask = getTaskfromTasks(
      tasks,
      "What is the image related to the promise"
    );
    const filename = imageTask.node.first_response_value;
    const annotationChanges = JSON.parse(imageLog.node.object_changes_json)
      .annotation_id;
    const id = annotationChanges ? annotationChanges[1] : null; // latest image ID
    return filename ? getassetURL(filename, id) : promiseImage;
  }

  const api = {
    promises: async (variables) => {
      return client.query({ query: GET_PROMISES, variables }).then((res) => {
        return res.data.search.medias.edges.map(({ node }) => ({
          id: node.id,
          title: node.title,
          image: getImage(node.log?.edges, node.tasks?.edges),
          description: node.description,
          date: new Date(parseInt(node.created_at, 10)).toDateString({
            dateStyle: "short",
          }),
          status: getStatus(node.tasks?.edges),
        }));
      });
    },
    promisesByCategories: async (variables) => {
      return client
        .query({ query: GET_PROMISES_BY_CATEGORIES, variables })
        .then(({ data }) => ({
          id: data.team.id,
          count: data.team.medias_count,
          name: data.team.name,
          categories: data.team.projects.edges.map(({ node }) => ({
            id: node.id,
            title: node.title,
            count: node.medias_count,
            projects: node.project_medias.edges.map((promise) => promise.node),
          })),
        }));
    },
  };
  return api;
}

export default check;
