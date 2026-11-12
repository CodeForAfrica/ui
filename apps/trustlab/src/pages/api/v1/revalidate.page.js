import { createHash, timingSafeEqual } from "node:crypto";

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
  // (\S.+) : Capture the rest of the string as the token
  //          ensuring at least one non-whitespace character
  // $      : End of string
  // /i     : Case-insensitive flag
  const match = authorizationHeader.match(/^Bearer\s+(\S.*)$/i);

  return match ? match[1] : null;
}

// Compares digests so that the comparison takes the same time whatever the
// token's length or content.
function isValidSecret(secret, expectedSecret) {
  // Fail closed: with no secret configured, a missing token would match
  if (!expectedSecret || !secret) {
    return false;
  }
  const digest = (value) => createHash("sha256").update(value).digest();
  return timingSafeEqual(digest(secret), digest(expectedSecret));
}

export default async function handler(req, res) {
  // Node converts header names to lowercase. Both the CMS and the deploy
  // script send the secret as a bearer token, never in the URL.
  const secret = getAuthToken(req.headers.authorization);
  if (!isValidSecret(secret, process.env.REVALIDATE_SECRET)) {
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
