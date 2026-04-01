import collectionOverview from "./collectionOverview";
import getOpportunityCategoryBlock from "./getOpportunityCategoryBlock";
import getOpportunityListBlock from "./getOpportunityListBlock";
import getParticipatingOrganizationListBlock from "./getParticipatingOrganizationListBlock";
import playbooksList from "./playbooksList";
import postList from "./postList";
import reportsList from "./reportsList";
import spotlightOverview from "./spotlightOverview";
import toolkitsList from "./toolkitsList";

const propsifyBlockBySlug = {
  "helplines-overview-list": collectionOverview,
  "resources-overview-list": collectionOverview,
  "opportunity-category": getOpportunityCategoryBlock,
  "opportunity-list": getOpportunityListBlock,
  "post-list": postList,
  spotlight: spotlightOverview,
  "reports-list": reportsList,
  "playbooks-list": playbooksList,
  "toolkits-list": toolkitsList,
  "participating-organization-list": getParticipatingOrganizationListBlock,
};

async function blockify(blocks, api, context) {
  const promises = blocks?.map(async (block) => {
    const slug = block.blockType;
    const propsifyBlock = propsifyBlockBySlug[slug];
    if (propsifyBlock) {
      return propsifyBlock(block, api, context);
    }
    return {
      ...block,
      slug,
    };
  });

  if (promises) {
    return Promise.all(promises);
  }
  return blocks ?? null;
}

export default blockify;
