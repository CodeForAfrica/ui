/**
 * This function will be called only when HURUmap tutorial is enabled.
 * @see @/climatemappedafrica/lib/data/common/index.js
 */
async function tutorial(block, _api, _context, { hurumap }) {
  const { steps, enabled } = hurumap.tutorial;

  const items = steps.map((step) => ({
    ...step,
    selector: `#${step.selector}`,
  }));
  return {
    ...block,
    enabled,
    items,
    slug: block.blockType,
  };
}

export default tutorial;
