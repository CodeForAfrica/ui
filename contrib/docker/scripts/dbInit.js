const config = {
  _id: "rs0",
  version: 1,
  members: [
    {
      _id: 1,
      host: "mongodb:27017",
      priority: 1,
    },
  ],
};
rs.initiate(config, { force: true });

rs.status();
db.createUser({
  user: process.env.MONGO_INITDB_ROOT_USERNAME || "root",
  pwd: process.env.MONGO_INITDB_ROOT_PASSWORD || "rootpassword",
  roles: [{ role: "root", db: "admin" }],
});
