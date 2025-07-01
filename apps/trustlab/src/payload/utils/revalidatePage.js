"use server";

/* eslint-disable no-underscore-dangle */
import findAndFormatPagePath from "@/commons-ui/payload/utils/findAndFormatPagePath";
import { revalidatePath } from "next/cache";

export const revalidatePage = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === "published") {
      const path = await findAndFormatPagePath(payload, doc?.slug);
      if (path) {
        revalidatePath(path);
      }
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === "published" && doc._status !== "published") {
      const oldPath = await findAndFormatPagePath(payload, previousDoc?.slug);
      if (oldPath) {
        revalidatePath(oldPath);
      }
    }
  }
  return doc;
};

export const revalidatePost = async ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === "published") {
      const parentId = doc?.parent;
      if (parentId) {
        const {
          docs: [parentDoc],
        } = await payload.find({
          collection: "pages",
          where: {
            id: {
              equals: doc?.parent,
            },
          },
        });
        const parentPath = await findAndFormatPagePath(
          payload,
          parentDoc?.slug,
        );
        if (parentPath) {
          const path = `${parentPath}/${doc.slug}`;
          payload.logger.info(`Revalidating page: ${path}`);
          revalidatePath(path);
        }
      }
    }

    // If the page was previously published, we need to revalidate the old path
    if (previousDoc?._status === "published" && doc._status !== "published") {
      const oldParentId = previousDoc?.parent;
      if (oldParentId) {
        const {
          docs: [previousParentDoc],
        } = await payload.find({
          collection: "pages",
          where: {
            id: {
              equals: previousDoc?.parent,
            },
          },
        });
        const oldParentPath = await findAndFormatPagePath(
          payload,
          previousParentDoc?.slug,
        );
        if (oldParentPath) {
          const oldPath = `${oldParentPath}/${previousDoc?.slug}`;
          payload.logger.info(`Revalidating old post: ${oldPath}`);
          revalidatePath(oldPath);
        }
      }
    }
  }
  return doc;
};

export const revalidateDelete = async ({ doc, req: { context, payload } }) => {
  if (!context.disableRevalidate) {
    const path = await findAndFormatPagePath(payload, doc?.slug);
    if (!path) {
      revalidatePath(path);
    }
  }
  return doc;
};
