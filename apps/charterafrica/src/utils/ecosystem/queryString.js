function queryString(params) {
  const query = Object.keys(params).reduce((acc, curr) => {
    if (params[curr]) {
      acc.append(curr, params[curr]);
    }
    return acc;
  }, new URLSearchParams());
  const qString = query.toString();
  return qString ? `?${qString}` : "";
}

export default queryString;
