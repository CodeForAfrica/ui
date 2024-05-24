import queryCategories from "@/hurumap/lib/wordpress/categories/queryCategories";
import { initializeWpApollo } from "@/hurumap/lib/wordpress/connector";

export default async function getCategories() {
  const apolloClient = initializeWpApollo();

  // Execute query.
  const response = await apolloClient.query({ query: queryCategories });

  return (
    response?.data?.categories?.edges
      ?.map(({ node }) => {
        return {
          ...node,
        };
      })
      .filter(({ slug }) => slug !== "uncategorized") ?? null
  );
}
