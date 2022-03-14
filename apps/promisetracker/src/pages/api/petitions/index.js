import FormData from "form-data";
import { getSession } from "next-auth/react";

import actnow from "@/promisetracker/lib/actnow";

async function createPetition(req, res) {
  const session = await getSession({ req });
  const values = req.body;
  const formdata = new FormData();
  formdata.append("title", values.title);
  formdata.append("source.link", values.source);
  formdata.append("description", values.description);
  formdata.append("recipients", values.recipients);
  formdata.append("problem_statement", values.problemStatement);
  formdata.append(
    "number_of_signatures_required",
    Number(values.numberOfSignaturesRequired)
  );
  formdata.append(
    "image",
    new Blob([values.image], { type: "application/octet-stream" })
  );

  try {
    const petition = await actnow().petitions().create(session, formdata);

    return res.status(201).json(petition);
  } catch (error) {
    return res.status(500).json(error);
  }
}

export default createPetition;
