import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";
import mongoose from "mongoose";


const mongoURL = process.env.MONGO_URL;
const oldCollectionName = "pages";
const newCollectionName = "research-pages";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  // Connect to the database
  await mongoose.connect(mongoURL);
  const db = mongoose.connection.db;

  // We will need the admin database for rename operation see https://www.mongodb.com/docs/manual/reference/command/renameCollection/
  const adminDb = mongoose.connection.getClient().db("admin");

  const oldCollectionVersionName = `_${oldCollectionName}_versions`;
  const newCollectionVersionName = `_${newCollectionName}_versions`;

  // Drop the new collection, since it has nothing and we cant rename the old collection to new name when this exists
  await db.command({ drop: newCollectionName });
  payload.logger.info(`Dropped the existing ${newCollectionName} collection.`);

  // Switch to admin DB for the rename operation
  await adminDb.command({
    renameCollection: `${db.databaseName}.${oldCollectionName}`,
    to: `${db.databaseName}.${newCollectionName}`,
  });

  payload.logger.info(
    `Renamed collections from ${oldCollectionName} to ${newCollectionName}`,
  );

  // Dealing with versions of the collections, we shall start by deleting the new collection name
  await db.command({ drop: newCollectionVersionName });
  payload.logger.info(
    `Dropped the existing ${newCollectionVersionName} collection.`,
  );
  // Update the collection version name
  await adminDb.command({
    renameCollection: `${db.databaseName}.${oldCollectionVersionName}`,
    to: `${db.databaseName}.${newCollectionVersionName}`,
  });

  payload.logger.info(`Renamed collection versions.`);
  payload.logger.info(
    `✓ Successfully renamed collection from ${oldCollectionName} to ${newCollectionName}`,
  );
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
}
