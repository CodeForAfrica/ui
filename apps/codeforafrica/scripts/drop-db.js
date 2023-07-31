const { MongoClient } = require("mongodb");

const mongoURL = process.argv[2];

if (!mongoURL) {
  console.log("Please provide a collection name to drop");
  process.exit(1);
}

const client = new MongoClient(mongoURL, {});

async function run() {
  try {
    await client.connect();
    const database = client.db();
    console.log("Dropping database", database.databaseName);
    await database.dropDatabase();
  } catch (err) {
    console.log(err.stack);
    process.exit(1);
  }
}

run().then(() => {
  console.log("Done");
  process.exit(0);
});
