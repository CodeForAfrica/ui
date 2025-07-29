/**
 * Returns the flag emoji for a given alpha-2 country code.
 * @param {string} alpha2Code - The alpha-2 country code (e.g., 'US', 'KE').
 * @returns {string} The flag emoji or an empty string if the code is invalid.
 */
function getFlagFromAlpha2(alpha2Code) {
  if (!alpha2Code || alpha2Code.length !== 2) {
    return "";
  }

  // Convert alpha-2 code to uppercase and map to regional indicator symbols
  const codePoints = alpha2Code
    .toUpperCase()
    .split("")
    .map((char) => 0x1f1e6 + char.charCodeAt(0) - "A".charCodeAt(0));

  return String.fromCodePoint(...codePoints);
}

export default getFlagFromAlpha2;
