import { gql } from "@apollo/client";

import acfFeaturedStoriesBlockFields from "@/hurumap/lib/wordpress/_query-partials/acfFeaturedStoriesBlockFields";
import categoriesPostFields from "@/hurumap/lib/wordpress/_query-partials/categoriesPostFields";
import defaultPageData from "@/hurumap/lib/wordpress/_query-partials/defaultPageData";
import seoPostFields from "@/hurumap/lib/wordpress/_query-partials/seoPostFields";
import {
  archivePostFragment,
  archivePosts,
} from "@/hurumap/lib/wordpress/posts/queryPostsArchive";

// Query: retrieve posts category archive.
const queryPostsByCategory = gql`
  query GET_POSTS_BY_CATEGORY(
    $orderBy: PostObjectsConnectionOrderbyEnum = DATE
    $order: OrderEnum = DESC
    $imageSize: MediaItemSizeEnum = MEDIUM
    $featuredImageSize: MediaItemSizeEnum = LARGE
    $id: ID!
    $idType: CategoryIdType = SLUG
    $offset: Int!
    $size: Int!
  ) {
    ${categoriesPostFields}
    ${defaultPageData}
    homepageSettings {
      postsPage {
        blocksJSON
        blocks {
          ${acfFeaturedStoriesBlockFields}
        }
      }
    }
    category(id: $id, idType: $idType) {
      ${seoPostFields}
      ${archivePosts}
    }
  }
  ${archivePostFragment}
`;

export default queryPostsByCategory;
