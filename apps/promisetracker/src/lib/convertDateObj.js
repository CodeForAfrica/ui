export default function convertDateObj(convertDate) {
  const date = new Date(Number.parseInt(convertDate, 10) * 1000);
  return date;
}
