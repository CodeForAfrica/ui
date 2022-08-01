import actnow from "@/promisetracker/lib/actnow";

async function registerNewUser(req, res) {
  try {
    const account = await actnow().accounts().create(req.body);
    return res.status(201).json(account);
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
