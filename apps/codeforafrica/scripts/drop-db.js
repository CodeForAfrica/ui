const { MongoClient } = require("mongodb");

const mongoURL = process.argv[2];

if (!mongoURL) {
  process.exit(1);
}

const client = new MongoClient(mongoURL, {});

async function run() {
  try {
    await client.connect();
    const database = client.db();
    await database.dropDatabase();
  } catch (err) {
    process.exit(1);
  }
}

run().then(() => {
  process.exit(0);
});
