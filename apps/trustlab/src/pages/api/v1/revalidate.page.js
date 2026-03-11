/**
 * Robustly extracts the Bearer token from the Authorization header.
 *
 * DESIGN RATIONALE:
 * 1. RFC Compliance: Uses the 'i' flag for case-insensitive matching of 'Bearer'.
 * 2. Resilience: Uses \s+ to handle cases with multiple spaces (common in manual CLI calls).
 * 3. Performance: Single-pass execution, avoids multiple string splits/arrays.
 */
function getAuthToken(authorizationHeader) {
  if (!authorizationHeader || typeof authorizationHeader !== "string") {
    return null;
  }

  // Regex breakdown:
  // ^      : Start of string
  // Bearer : The literal scheme name
  // \s+    : One or more whitespace characters
  // (.+)   : Capture the rest of the string as the token
  // $      : End of string
  // /i     : Case-insensitive flag
  const match = authorizationHeader.match(/^Bearer\s+(.+)$/i);

  return match ? match[1] : null;
}

export default async function handler(req, res) {
  // Node converts header names to lowercase
  let secret = getAuthToken(req.headers.authorization);
  if (!secret) {
    // TODO(kilemensi): @kevinkoech do we need to support query/GET
    //                  for the secret or will headers/POST do?
    secret = req.query.secret;
  }
  if (secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }
  const { path } = req.body;
  if (!path) {
    return res.status(400).json({ message: "Path is required" });
  }
  try {
    await res.revalidate(path);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).json({ message: "Error revalidating", error: err });
  }
}
