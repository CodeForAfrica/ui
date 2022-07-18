export default function equalsIgnoreCase(a, b) {
  return a?.localeCompare(b, undefined, { sensitivity: "accent" }) === 0;
}
