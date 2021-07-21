async function registerNewUser(req, res) {
  try {
    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Token ${process.env.ACTNOW_API_KEY}`,
    });
    const response = await fetch(`${process.env.ACTNOW_URL}/v1/accounts/`, {
      method: "POST",
      headers,
      body: JSON.stringify(req.body),
    });
    const json = await response.json();
    return res.status(response.status).json(json);
  } catch (error) {
    return res.status(500).json(error);
  }
}

async function handleAccounts(req, res) {
  if (req.method === "POST") {
    return registerNewUser(req, res);
  }
  return res.status(403).json();
}

export default handleAccounts;
