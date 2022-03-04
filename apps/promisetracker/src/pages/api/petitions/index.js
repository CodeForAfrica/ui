import { getSession } from "next-auth/react";

import actnow from "@/promisetracker/lib/actnow";

async function createPetition(req, res) {
  const session = await getSession({ req });

  try {
    const petition = await actnow().petitions().create(session, req.body);

    return res.status(201).json(petition);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export default createPetition;
