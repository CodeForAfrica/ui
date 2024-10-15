import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";
import mongoose from "mongoose";

const mongoURL = process.env.MONGO_URL;
const oldCollectionName = "pages";
const newCollectionName = "research-pages";
const oldCollectionVersionName = `_${oldCollectionName}_versions`;
const newCollectionVersionName = `_${newCollectionName}_versions`;

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  // Connect to the database
  await mongoose.connect(mongoURL);
  const db = mongoose.connection.db;

  // Find all records in oldCollection
  let records = await db.collection(oldCollectionName).find().toArray();

  // Store all the records in oldCollection to newCollection
  for (const record of records) {
    try {
      await db.collection(newCollectionName).insertOne(record);
      payload.logger.info(
        `Successfully migrated collection with slug: ${record.slug} from ${oldCollectionName} to ${newCollectionName}`,
      );
    } catch (error) {
      payload.logger.error(
        `Error migrating collection with slug: ${record.slug}, ${error.message}`,
      );
    }
  }

  // Finding all versions of the collections
  records = await db.collection(oldCollectionVersionName).find().toArray();

  // Store all oldCollectionVersionName in newCollectionVersionName
  for (const record of records) {
    try {
      await db.collection(newCollectionVersionName).insertOne(record);
      payload.logger.info(
        `Successfully migrated version collection with slug: ${record.slug} from ${oldCollectionVersionName} to ${newCollectionVersionName}`,
      );
    } catch (error) {
      payload.logger.error(
        `Error migrating version collection with slug: ${record.slug} from ${oldCollectionVersionName} to ${newCollectionVersionName}`,
      );
    }
  }
  payload.logger.info(`✓ Successfully completed migration`);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {}
