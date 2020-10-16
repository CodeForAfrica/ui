import { gql } from "apollo-boost";

export default gql`
  query {
    team(slug: "pesacheck-promise-tracker") {
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
