import api from "@/trustlab/lib/payload";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { form, ...rest } = req.body;

  const submissionData = Object.entries(rest).map(([field, value]) => ({
    field,
    value,
  }));
  try {
    await api.createCollection("form-submissions", {
      submissionData,
      form,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Failed to submit email" });
  }
}
