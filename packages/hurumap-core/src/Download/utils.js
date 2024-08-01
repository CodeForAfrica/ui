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

export function downloadImage(url, title, imgType) {
  const link = document.createElement("a");
  link.download = `${title}.${imgType}`;
  link.href = url;
  /* eslint-env browser */
  document.body.appendChild(link);
  link.click();
  /* eslint-env browser */
  document.body.removeChild(link);
}

export async function createImage({
  view,
  totalHeight,
  chartTitle,
  chartSubtitle,
  source = "",
  projectlogo,
  cfalogo,
  backgroundColor,
  layout,
  imgType,
  scaleFactor,
}) {
  if (!view) {
    return null;
  }

  view?.signal("totalHeight", totalHeight);
  view?.signal("chartTitle", chartTitle);
  view?.signal("chartSubtitle", chartSubtitle.toUpperCase());
  view?.signal("chartSource", source);
  view?.signal("projectLogoUrl", projectlogo);
  view?.signal("logoWidth", 60);
  view?.signal("logoUrl", cfalogo);
  view?.signal("background", backgroundColor);

  if (layout === 0) {
    view?.signal("titleY", 20);
    view?.signal("titleH", 60 + (chartTitle.length - 1) * 15);
    view?.signal("chartY", 50);
    view?.signal("titleGroupY", 0);
    view?.signal("sourceGroupY", totalHeight - 80);
    view?.signal("sourceGroupH", 60);
    view?.signal("sourceY", 30);
  } else {
    view?.signal("titleY", 25);
    view?.signal("titleH", 60 + (chartTitle.length - 1) * 15);
    view?.signal("chartY", 60);
    view?.signal(
      "titleGroupY",
      totalHeight - 80 + (chartTitle.length - 1) * 15,
    );
    view?.signal("sourceGroupY", 1);
    view?.signal("sourceGroupH", 60);
    view?.signal("sourceY", 30);
  }

  await view?.runAsync();

  const url = await view.toImageURL(imgType, scaleFactor);

  return url;
}
