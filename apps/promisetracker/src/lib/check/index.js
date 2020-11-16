import {
  GET_PROMISES,
  GET_PROMISES_BY_CATEGORIES,
  GET_PROJECT_META,
} from "@/promisetracker/lib/check/gql";

import config from "@/promisetracker/config";
import promiseImage from "@/promisetracker/assets/promise-thumb-01.png";
import { slugify } from "@/promisetracker/utils";
import createApolloClient from "./createApolloClient";

const UNSPECIFIED_TEAM = "unspecified";
const CLIENT_PER_TEAM = new Map();

function check({ team = undefined, promiseStatuses, initialState = {} }) {
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

  function getPromiseDate(node) {
    const items = node.tasks?.edges;
    const startDateTask = findItemByNodeLabel(
      items,
      "When was this promise made?"
    );
    return startDateTask
      ? startDateTask.node.first_response_value.split(" ").slice(0, 3).join(" ")
      : null;
  }
  function getPromiseDeadlineEvent(node) {
    const items = node.tasks?.edges;
    const deadlineTask = findItemByNodeLabel(
      items,
      "What is the deadline for the implementation of the promise?"
    );
    const duration = Number(
      deadlineTask?.node.first_response_value?.split("")[0]
    );
    const startYear = new Date(getPromiseDate(node)).getFullYear();

    let deadlineEvent = {};

    if (duration && startYear) {
      deadlineEvent = {
        title: "Deadline",
        year: startYear + duration,
      };
    }
    return deadlineEvent;
  }

  function getStatusHistory(node) {
    const logs = node.log?.edges;
    const defaultStatus = config.promiseStatuses.find(
      (status) => status.title === "Unrated"
    );
    const statusLogs = logs.filter(
      (item) => item.node.task?.label === "What is the status of the promise?"
    );
    const statusHistory = statusLogs
      .sort((statusA, statusB) =>
        statusB.node?.created_at.localeCompare(statusA.node?.created_at)
      )
      .filter((statusLog, idx) => {
        const currentStatus = JSON.parse(statusLog.node.object_changes_json)
          .value[1].replace(/[^\w\s]/gi, "")
          .trim();
        const prevStatus =
          idx > 0
            ? JSON.parse(statusLogs[idx - 1]?.node.object_changes_json)
                .value[1].replace(/[^\w\s]/gi, "")
                .trim()
            : null;
        return prevStatus !== currentStatus;
      })
      .map((statusLog) => {
        const date = statusLog.node?.created_at * 1000; // convert from secons to milliseconds
        const status = JSON.parse(statusLog?.node.object_changes_json)
          .value[1].replace(/[^\w\s]/gi, "")
          .trim();
        let matchingStatus = config.promiseStatuses.find(
          (currentStatus) => currentStatus.title === status
        );
        matchingStatus = matchingStatus || defaultStatus;
        return { date, ...matchingStatus };
      });

    return statusHistory.length ? statusHistory : [defaultStatus];
  }

  function handlePromisesResult(res) {
    return res.data.search.medias.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      image: getImage(node),
      description: node.description,
      date: getPromiseDate(node),
      events: [getPromiseDeadlineEvent(node)],
      status: getStatusHistory(node)[0],
      statusHistory: getStatusHistory(node),
    }));
  }

  function handleSinglePromise(promises, slug) {
    return promises.find((promise) => slugify(promise.title) === slug);
  }

  function handleMeta({
    data: {
      me: {
        current_team: { updated_at: updatedAt, description, tag_texts: tags },
      },
    },
  }) {
    const descriptionArr = description.split("|");
    const position = descriptionArr[2];
    const promiseLabel = descriptionArr[3];
    const trailText = descriptionArr[4];

    return {
      updatedAt: Number(updatedAt) * 1000,
      description: descriptionArr[0],
      position,
      promiseLabel,
      trailText,
      name: descriptionArr[1],
      tags: tags.edges.map((tag) => tag.node),
    };
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
    projectMeta: async () => {
      return client.query({ query: GET_PROJECT_META }).then(handleMeta);
    },
    promise: async ({ slug, query }) => {
      const variables = { limit: 10000, query };
      return client
        .query({ query: GET_PROMISES, variables })
        .then(handlePromisesResult)
        .then((promises) => handleSinglePromise(promises, slug));
    },
  };
  return api;
}

export default check;
