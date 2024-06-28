import payload from "payload";
import { ByIDOptions } from "payload/dist/collections/operations/local/update";
import { Options } from "payload/dist/globals/operations/local/findOne";
import { SettingsSite, Page, Config } from "../../../payload-types";
import { PaginatedDocs } from "payload/database";

export type CollectionConfig = keyof Config["collections"];
export type CollectionItemTypes = Config["collections"][CollectionConfig];
export type GlobalConfig = keyof Config["globals"];

async function findPage(slug: string): Promise<PaginatedDocs<Page>> {
  return payload.find({
    collection: "pages",
    where: {
      slug: {
        equals: slug,
      },
    },
  });
}

async function getCollection(
  collection: CollectionConfig,
  options?: Partial<ByIDOptions<CollectionConfig>>,
): Promise<PaginatedDocs<CollectionItemTypes>> {
  return payload.find({
    limit: 0,
    ...options,
    collection,
  });
}

async function findGlobal(
  slug: GlobalConfig,
  options?: Partial<Options<GlobalConfig>>,
): Promise<SettingsSite> {
  return payload.findGlobal({
    ...options,
    slug,
  });
}

async function createCollection(
  collection: CollectionConfig,
  data: any,
  options?: Partial<ByIDOptions<CollectionConfig>>,
): Promise<CollectionItemTypes> {
  return payload.create({
    collection,
    data,
    ...options,
  });
}

async function deleteCollection(
  collection: CollectionConfig,
  options: ByIDOptions<CollectionConfig>,
): Promise<CollectionItemTypes> {
  return payload.delete({
    ...options,
    collection,
  });
}

async function updateCollection(
  collection: CollectionConfig,
  id: string,
  data: any,
  options: ByIDOptions<CollectionConfig>,
): Promise<CollectionItemTypes> {
  const args = {
    ...options,
    collection,
    id,
    data,
  };
  return payload.update(args);
}
const api = {
  createCollection,
  deleteCollection,
  findGlobal,
  findPage,
  getCollection,
  updateCollection,
};

export type Api = typeof api;

export default api;
