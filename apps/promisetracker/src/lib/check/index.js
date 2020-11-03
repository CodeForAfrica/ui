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

  function findItemByNodeLabel(tasks, label) {
    return tasks.find((item) => item.node.label === label);
  }

  function findItemByTaskLabel(items, label) {
    return items.find((item) => item.node.task?.label === label);
  }

  function getAssetURL(filename, id) {
    return `${config.CHECK_ASSET_URI}/${id}/${filename.replace(/ /g, "_")}`;
  }

  function getImage(node) {
    const logs = node.log?.edges;
    const tasks = node.tasks?.edges;
    const imageLog = findItemByTaskLabel(
      logs,
      "What is the image related to the promise"
    );
    const imageTask = findItemByNodeLabel(
      tasks,
      "What is the image related to the promise"
    );
    const filename = imageTask.node.first_response_value;
    const annotationChanges = JSON.parse(imageLog.node.object_changes_json)
      .annotation_id;
    const id = annotationChanges ? annotationChanges[1] : null; // latest image ID
    return filename && id ? getAssetURL(filename, id) : promiseImage;
  }

  function getPromiseYear(node) {
    const items = node.tasks?.edges;
    const startDateTask = findItemByNodeLabel(
      items,
      "When was this promise made?"
    );
    return startDateTask
      ? startDateTask.node.first_response_value.split(" ").slice(0, 3).join(" ")
      : null;
  }

  function getStatus(node) {
    const items = node.tasks?.edges;
    const statusTask = findItemByNodeLabel(
      items,
      "What is the status of the promise?"
    );
    const promiseStatus = config.promiseStatuses.find(
      (status) => status.title === statusTask?.node.first_response_value
    );
    const defaultStatus = config.promiseStatuses.find(
      (status) => status.title === "Unrated"
    );
    return promiseStatus || defaultStatus;
  }

  function handlePromisesResult(res) {
    return res.data.search.medias.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      image: getImage(node),
      description: node.description,
      date: new Date(parseInt(node.created_at, 10) * 1000).toDateString({
        dateStyle: "short",
      }),
      promiseDate: getPromiseYear(node),
      status: getStatus(node),
      statuses: [getStatus(node)],
    }));
  }

  function handlePromisesCategoryResults({ data }) {
    return {
      id: data.team.id,
      count: data.team.medias_count,
      name: data.team.name,
      categories: data.team.projects.edges.map(({ node }) => ({
        id: node.id,
        title: node.title,
        count: node.medias_count,
        projects: node.project_medias.edges.map((promise) => promise.node),
      })),
    };
  }

  const api = {
    promises: async (variables) => {
      return client
        .query({ query: GET_PROMISES, variables })
        .then(handlePromisesResult);
    },
    promisesByCategories: async (variables) => {
      return client
        .query({ query: GET_PROMISES_BY_CATEGORIES, variables })
        .then(handlePromisesCategoryResults);
    },
  };
  return api;
}

export function groupPromisesByStatus(promises) {
  return {
    count: promises.length,
    /* eslint-disable no-param-reassign */
    statuses: promises.reduce((promiseByStatus, promise) => {
      (promiseByStatus[promise.status.title] =
        promiseByStatus[promise.status.title] || []).push(promise);
      return promiseByStatus;
    }, {}),
  };
}

export default check;
