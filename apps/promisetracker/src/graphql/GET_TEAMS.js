import { gql } from "apollo-boost";

export default gql`
  query {
    team(slug: "pesacheck-promise-tracker") {
      id
      name
      dbid
    }
  }
`;
