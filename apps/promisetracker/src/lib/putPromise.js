import gql from "graphql-tag";
import useClient from "@/promisetracker/lib/useClient";

export default async ({ apolloClient, data }) => {
  const isBrowser = typeof window !== "undefined";

  if (isBrowser) {
    return fetch("/api/promises", {
      method: "POST",
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }

  const { quote, source } = data;
  await (apolloClient || useClient()).mutate({
    mutation: gql`
      mutation createProjectMedia(
        $clientMutationId: String
        $project_id: Int
        $quote: String
        $quote_attributions: String
      ) {
        createProjectMedia(
          input: {
            clientMutationId: $clientMutationId
            project_id: $project_id
            quote: $quote
            quote_attributions: $quote_attributions
          }
        ) {
          project_media {
            id
            title
            description
            project_id
            media_id
            project_source {
              id
              source {
                id
                name
              }
            }
          }
        }
      }
    `,
    variables: {
      clientMutationId: "1",
      project_id: 2799,
      quote: `Promise Tracker Submission (Ready for Review) \n Title: ${quote} \n Sources: ${source}`,
      quote_attributions: `{"name": "Source:${source}"}`,
    },
  });

  return {};
};
