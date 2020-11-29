export function slugify(string) {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export function groupPromisesByStatus(promises) {
  return {
    count: promises.length,
    /* eslint-disable no-param-reassign */
    statusHistory: promises.reduce((promiseByStatus, promise) => {
      (promiseByStatus[promise.status.title] =
        promiseByStatus[promise.status.title] || []).push(promise);
      return promiseByStatus;
    }, {}),
  };
}

export function formatDate(date) {
  const locales = "en-US";
  const options = { year: "numeric", month: "long", day: "2-digit" };

  return new Date(date).toLocaleDateString(locales, options);
}

export function replaceAll(str, mapObj) {
  const re = new RegExp(Object.keys(mapObj).join("|"), "gi");

  return str.replace(re, (matched) => mapObj[matched.toLowerCase()]);
}
