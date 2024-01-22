const config = {
  _id: "dbrs",
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
  user: "root",
  pwd: "rootpassword",
  roles: [{ role: "root", db: "admin" }],
});
