import mongoose from "mongoose";

const mongoURL = process.argv[2];

if (!mongoURL) {
  process.exit(1);
}

async function run() {
  try {
    await mongoose.connect(mongoURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
}

await run();
