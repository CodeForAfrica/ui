export function imageFromMedia({ alt = null, url = null }) {
  return { alt, src: url };
}

export function actionFromActionButton({ href, label, newTab = false }) {
  return { href, label, newTab };
}

export default undefined;
