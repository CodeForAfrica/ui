import gql from 'graphql-tag';
import config from 'config';
import useClient from './useClient';

export default async ({ apolloClient, limit: maxCount }) => {
  const limit = maxCount || config.CHECK_PROMISE_MAX_COUNT;
  const isBrowser = typeof window !== 'undefined';

  if (isBrowser) {
    return {
      promises: await fetch('/api/promises', { params: { limit } }).then(res =>
        res.json()
      )
    };
  }

  const { data } = await (apolloClient || useClient()).query({
    query: gql`
      query getPromises($query: String!, $limit: Int!) {
        search(query: $query) {
          medias(first: $limit) {
            edges {
              node {
                id
                dbid
                title
                description
                status
                archived
                tasks {
                  edges {
                    node {
                      id
                      label
                      first_response_value
                    }
                  }
                }
                tags {
                  edges {
                    node {
                      id
                      tag_text
                    }
                  }
                }
                log {
                  edges {
                    node {
                      event_type
                      object_changes_json
                      task {
                        label
                        updated_at
                      }
                      created_at
                    }
                  }
                }
              }
            }
          }
        }
      }
    `,
    variables: {
      limit,
      query: `{ "verification_status":["${config.CHECK_PROMISE_VERIFICATION_STATUS}"], "projects":["${config.CHECK_PROJECT_DB_ID}"] }`
    }
  });

  return {
    promises: data.search.medias.edges.map(({ node }) => node)
  };
};
