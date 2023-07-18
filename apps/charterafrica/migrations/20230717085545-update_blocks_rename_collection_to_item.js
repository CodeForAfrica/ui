module.exports = {
  async up(db) {
    await db.collection("pages").updateMany({}, [
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
  },

  async down(db) {
    await db.collection("pages").updateMany({}, [
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
  },
};
