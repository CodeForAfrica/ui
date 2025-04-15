import { getPayload } from "payload";
import configPromise from "../../../payload.config";
import { ByIDOptions } from "payload/dist/collections/operations/local/update";
import { Options } from "payload/dist/globals/operations/local/findOne";
import { PaginatedDocs } from "payload";
import { Config, Page, SettingsSite } from "@/root/payload-types";

export type CollectionConfig = keyof Config["collections"];
export type CollectionItemTypes = Config["collections"][CollectionConfig];
export type GlobalConfig = keyof Config["globals"];

async function findPage(
  slug: string,
  options?: Partial<ByIDOptions<CollectionConfig, any>>,
): Promise<PaginatedDocs<Page>> {
  const payload = await getPayload({ config: configPromise });
  return payload.find({
    ...options,
    collection: "pages",
    where: {
      slug: {
        equals: slug,
      },
    },
  }) as unknown as PaginatedDocs<Page>;
}

async function getCollection(
  collection: CollectionConfig,
  options?: Partial<ByIDOptions<CollectionConfig, any>>,
): Promise<PaginatedDocs<CollectionItemTypes>> {
  const payload = await getPayload({ config: configPromise });
  return payload.find({
    limit: 0,
    ...options,
    collection,
  }) as unknown as Promise<PaginatedDocs<CollectionItemTypes>>;
}

async function findGlobal(
  slug: GlobalConfig,
  options?: Partial<Options<GlobalConfig, any>>,
): Promise<SettingsSite> {
  const payload = await getPayload({ config: configPromise });
  return payload.findGlobal({
    ...options,
    slug,
  }) as unknown as Promise<SettingsSite>;
}

async function createCollection(
  collection: CollectionConfig,
  data: any,
  options?: Partial<ByIDOptions<CollectionConfig, any>>,
): Promise<CollectionItemTypes> {
  const payload = await getPayload({ config: configPromise });
  return payload.create({
    collection,
    data,
    ...options,
  }) as unknown as Promise<CollectionItemTypes>;
}

async function deleteCollection(
  collection: CollectionConfig,
  options: ByIDOptions<CollectionConfig, any>,
): Promise<CollectionItemTypes> {
  const payload = await getPayload({ config: configPromise });
  return payload.delete({
    ...options,
    collection,
  }) as unknown as Promise<CollectionItemTypes>;
}

async function updateCollection(
  collection: CollectionConfig,
  id: string,
  data: any,
  options?: ByIDOptions<CollectionConfig, any>,
): Promise<CollectionItemTypes> {
  const payload = await getPayload({ config: configPromise });
  const args = {
    ...options,
    collection,
    id,
    data,
  };
  return payload.update(args) as unknown as Promise<CollectionItemTypes>;
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
