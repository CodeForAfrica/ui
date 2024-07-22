async function main() {
  const { NEXT_PUBLIC_APP_URL, SECRET_TOKEN } = process.env;
  const headers = {
    "x-api-key": SECRET_TOKEN ?? "",
  };
  const res = await fetch(`${NEXT_PUBLIC_APP_URL}/api/processGsheet`, {
    headers,
  });
  return res.json();
}

main().then(console.log);
