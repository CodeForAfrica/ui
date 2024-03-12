export default function toCamelCase(str: string) {
  return str
    .split(" ")
    .map((word: string, index: number) => {
      if (index === 0) {
        return word.toLowerCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    })
    .join("");
}
