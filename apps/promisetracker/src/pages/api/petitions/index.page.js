import FormData from "form-data";
import { getSession } from "next-auth/react";

import actnow from "@/promisetracker/lib/actnow";

async function createPetition(req, res) {
  if (req.method === "POST") {
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
    if (values.image.name) {
      const imageBuffer = Buffer.from(values.image.binary, "binary");
      formdata.append("image", imageBuffer, values.image.name);
    }
    try {
      const petition = await actnow().petitions().create(session, formdata);
      return res.status(201).json(petition);
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(405).json({
      message: "Method not allowed",
    });
  }
}

export default createPetition;
