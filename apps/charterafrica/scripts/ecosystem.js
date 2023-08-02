require("dotenv").config({ path: "./.env" });
require("dotenv").config({ path: "./.env.local" });

async function main() {
  const { RESOURCES_SECRET_TOKEN } = process.env;
  const { NEXT_PUBLIC_APP_URL } = process.env;
  const method = process.argv[2];
  const headers = {
    "x-api-key": RESOURCES_SECRET_TOKEN,
  };
  const res = await fetch(
    `${NEXT_PUBLIC_APP_URL}/api/v1/resources/ecosystem/entities`,
    {
      method,
      headers,
    },
  );
  return res.json();
}

main().then(console.log);
