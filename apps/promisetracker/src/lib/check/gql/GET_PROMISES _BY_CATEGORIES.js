import gql from "graphql-tag";

export default gql`
  query getPromisesByCategories($team: String!) {
    team(slug: $team) {
      id
      name
      medias_count
      projects {
        edges {
          node {
            id
            title
            medias_count
            project_medias {
              edges {
                node {
                  id
                  title
                  description
                  media {
                    id
                    thumbnail_path
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
