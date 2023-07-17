module.exports = {
  async up(db) {
    const bulkOps = [];

    await db
      .collection("pages")
      .find()
      .forEach((doc) => {
        if (doc.blocks && doc.blocks.length > 0) {
          doc.blocks.forEach((block) => {
            if (block.items && block.items.length > 0) {
              block.items.forEach((item) => {
                if (item.collection) {
                  // eslint-disable-next-line no-param-reassign
                  item.item = item.collection;
                  // eslint-disable-next-line no-param-reassign
                  delete item.collection;
                  const { _id } = doc;
                  bulkOps.push({
                    updateOne: {
                      filter: { _id },
                      update: { $set: { blocks: doc.blocks } },
                    },
                  });
                }
              });
            }
          });
        }
      });

    if (bulkOps.length > 0) {
      db.collection("pages").bulkWrite(bulkOps);
    }
  },

  async down(db) {
    const bulkOps = [];

    await db
      .collection("pages")
      .find()
      .forEach((doc) => {
        if (doc.blocks && doc.blocks.length > 0) {
          doc.blocks.forEach((block) => {
            if (block.items && block.items.length > 0) {
              block.items.forEach((item) => {
                if (item.item) {
                  // eslint-disable-next-line no-param-reassign
                  item.collection = item.item;
                  // eslint-disable-next-line no-param-reassign
                  delete item.item;
                  const { _id } = doc;
                  bulkOps.push({
                    updateOne: {
                      filter: { _id },
                      update: { $set: { blocks: doc.blocks } },
                    },
                  });
                }
              });
            }
          });
        }
      });

    if (bulkOps.length > 0) {
      db.collection("pages").bulkWrite(bulkOps);
    }
  },
};
