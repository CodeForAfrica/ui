import gql from 'graphql-tag';
import useClient from './useClient';

export default async ({ apolloClient }) => {
  const isBrowser = typeof window !== 'undefined';

  if (isBrowser) {
    return {
      promises: await fetch('/api/promises').then(res => res.json())
    };
  }

  const { data } = await (apolloClient || useClient()).query({
    query: gql`
      query {
        team(slug: "pesacheck-promise-tracker") {
          id
          name
          projects {
            edges {
              node {
                id
                title
                project_medias(last: 6) {
                  edges {
                    node {
                      id
                      dbid
                      title
                      description
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
                    }
                  }
                }
              }
            }
          }
        }
      }
    `
  });

  return {
    promises: data.team.projects.edges.map(({ node }) => node)
  };
};
