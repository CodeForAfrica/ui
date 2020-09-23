export default function slugify(param) {
  return param.replace(/[,:\s]/g, "-").toLowerCase();
}
