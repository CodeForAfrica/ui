import { MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const { db } = payload;
  const collection = db.collections["pages"];
  const result = await collection.updateMany(
    { "blocks.collection": { $exists: true } },
    {
      $set: {
        "blocks.$.items": "$blocks.$.collection",
      },
      $unset: {
        "blocks.$.collection": "",
      },
    },
  );

  console.log(`${result.modifiedCount} documents updated.`);
}

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  const { db } = payload;
  const collection = db.collections["pages"];
  const result = await collection.updateMany(
    { "blocks.items": { $exists: true } },
    {
      $set: {
        "blocks.$.collection": "$blocks.$.items",
      },
      $unset: {
        "blocks.$.items": "",
      },
    },
  );
  console.log(`${result.modifiedCount} documents updated.`);
}
