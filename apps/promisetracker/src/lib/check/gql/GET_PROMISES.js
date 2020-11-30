import gql from "graphql-tag";

export default gql`
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
            created_at
            tags {
              edges {
                node {
                  tag_text
                }
              }
            }
            tasks {
              edges {
                node {
                  id
                  dbid
                  label
                  first_response_value
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
`;
