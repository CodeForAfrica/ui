import payload from "payload";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ error: "Invalid email" });
  }

  try {
    await payload.create({
      collection: "page-under-construction",
      data: { email },
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ error: "Failed to submit email" });
  }
}
