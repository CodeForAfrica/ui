import gql from "graphql-tag";

export default gql`
  query {
    me {
      current_team {
        id
        dbid
        updated_at
        description
        name
        tag_texts {
          edges {
            node {
              id
              text
            }
          }
        }
        team_tasks {
          edges {
            node {
              id
              label
              options
            }
          }
        }
        projects {
          edges {
            node {
              id
              description
            }
          }
        }
      }
    }
  }
`;
