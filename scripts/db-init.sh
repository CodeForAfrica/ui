#!/bin/bash

DELAY=5

mongosh -u root -p rootpassword --authenticationDatabase admin <<EOF
var config = {
    "_id": "dbrs",
    "version": 1,
    "members": [
        {
            "_id": 1,
            "host": "mongodb_container:27017",
            "priority": 1
        },
    ]
};
rs.initiate(config, { force: true });
EOF

echo "****** Waiting for ${DELAY} seconds for replicaset configuration to be applied ******"

sleep $DELAY

mongosh -u root -p rootpassword --authenticationDatabase admin <<EOF
rs.status();
db.createUser({
  user: "root",
  pwd: "rootpassword",
  roles: [{ role: "root", db: "admin" }],
});
EOF