export function getSpreadsheetIdFromUrl(url = "") {
  const urlRegex =
    /^https:\/\/docs\.google\.com\/spreadsheets\/d\/([a-zA-Z0-9-_]+)\/?/;
  const match = url.match(urlRegex);
  if (!match) {
    return "";
  }
  const spreadsheetId = match[1];
  return spreadsheetId;
}

export function mapUrlToId({ siblingData }) {
  const spreadSheetId = getSpreadsheetIdFromUrl(siblingData.url);
  return spreadSheetId;
}
