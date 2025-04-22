import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-mongodb";
import mongoose from "mongoose";

const mongoURL = process.env.MONGO_URL || "";
const { ObjectId } = mongoose.Types;

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  // Connect to the database
  await mongoose.connect(mongoURL);
  const db = mongoose.connection.db;

  const docs = await db?.collection("_pages_versions").find().toArray();

  let updatedCount = 0;

  // Process each document
  for (const doc of docs || []) {
    if (typeof doc.parent === "string") {
      try {
        // Update document with ObjectId
        await db
          ?.collection("_pages_versions")
          .updateOne(
            { _id: doc._id },
            { $set: { parent: new ObjectId(doc.parent) } },
          );
        updatedCount++;
      } catch (error) {
        console.error(`Error updating document ${doc._id}: ${error}`);
      }
    }
  }
}

export async function down({
  payload,
  req,
  session,
}: MigrateDownArgs): Promise<void> {
  // Migration code
}
