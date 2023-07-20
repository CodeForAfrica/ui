export function generateFullTitle(breadcrumbs) {
  if (Array.isArray(breadcrumbs)) {
    return breadcrumbs.reduce((title, breadcrumb, i) => {
      if (i === 0) {
        return `${breadcrumb.label}`;
      }
      return `${title} > ${breadcrumb.label}`;
    }, "");
  }
  return undefined;
}

async function populateFullTitle({ data, originalDoc }) {
  return generateFullTitle(data?.breadcrumbs || originalDoc?.breadcrumbs);
}

export default populateFullTitle;
