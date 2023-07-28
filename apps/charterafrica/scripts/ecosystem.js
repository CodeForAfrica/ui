const { exec } = require("@actions/exec");

require("dotenv").config({ path: "./.env" });
require("dotenv").config({ path: "./.env.local" });

(async () => {
  const { RESOURCES_SECRET_TOKEN } = process.env;
  const { NEXT_PUBLIC_APP_URL } = process.env;
  const METHOD = process.argv[2];
  const command = `curl -X ${METHOD} -H "x-api-key: ${RESOURCES_SECRET_TOKEN}" ${NEXT_PUBLIC_APP_URL}/api/v1/resources/ecosystem/entities`;
  await exec(command);
})();
