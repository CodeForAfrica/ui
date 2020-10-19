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
          }
        }
      }
    }
  }
`;
