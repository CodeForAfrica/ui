import Papa from "papaparse";
import * as XLSX from "xlsx";

export function downloadSheetData(data, type, filename, title) {
  if (type === "csv") {
    const href = `data:text/csv;charset=utf-8,${Papa.unparse(data)}`;
    const link = document.createElement("a");
    link.href = href;
    link.download = filename;
    /* eslint-env browser */
    document.body.appendChild(link);
    link.click();
    link.remove();
  } else {
    const table = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    // Excel limit sheet title to 31 characters
    const maxTitleLength = 31;
    const truncatedTitle =
      title.length > maxTitleLength
        ? title.substring(0, maxTitleLength)
        : title;
    XLSX.utils.book_append_sheet(wb, table, truncatedTitle);
    XLSX.writeFile(wb, filename);
  }
}

export function downloadJson(data, filename) {
  const href = `data:text/json;charset=utf-8,${encodeURIComponent(
    JSON.stringify(data),
  )}`;
  const link = document.createElement("a");
  link.href = href;
  link.download = filename;
  /* eslint-env browser */
  document.body.appendChild(link);
  link.click();
  link.remove();
}
