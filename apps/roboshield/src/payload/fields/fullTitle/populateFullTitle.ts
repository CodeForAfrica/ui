import type { FieldHookArgs } from "payload";

export function generateFullTitle(breadcrumbs: any) {
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

async function populateFullTitle({ data, originalDoc }: FieldHookArgs) {
  return generateFullTitle(data?.breadcrumbs || originalDoc?.breadcrumbs);
}

export default populateFullTitle;
