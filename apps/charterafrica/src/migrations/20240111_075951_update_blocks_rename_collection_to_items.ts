import {
  MigrateUpArgs,
  MigrateDownArgs,
} from "@payloadcms/db-mongodb";

export async function up({ payload }: MigrateUpArgs): Promise<void> {
  const { db } = payload;
  await db.collections["pages"].updateMany({}, [
    {
      $set: {
        blocks: {
          $map: {
            input: "$blocks",
            in: {
              $mergeObjects: [
                "$$this",
                {
                  items: {
                    $map: {
                      input: "$$this.items",
                      in: {
                        item: "$$this.collection",
                        label: "$$this.label",
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      },
    },
  ]);
};

export async function down({ payload }: MigrateDownArgs): Promise<void> {
  const { db } = payload;
  await db.collections["pages"].updateMany({}, [
    {
      $set: {
        blocks: {
          $map: {
            input: "$blocks",
            in: {
              $mergeObjects: [
                "$$this",
                {
                  items: {
                    $map: {
                      input: "$$this.items",
                      in: {
                        collection: "$$this.item",
                        label: "$$this.label",
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      },
    },
  ]);
}
