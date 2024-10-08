function formatNumericalValue({ value, method }) {
  let options = {};
  let multipler = 100;

  if (method === "absolute_value") {
    options = { style: "decimal", maximumFractionDigits: 0 };
    multipler = 1;
  } else if (method === "decimal") {
    options = { style: "decimal", maximumFractionDigits: 2 };
    multipler = 1;
  } else {
    options = { style: "percent", maximumFractionDigits: 2 };
  }

  const formatter = new Intl.NumberFormat(undefined, options);
  return formatter.format(value / multipler);
}

export default formatNumericalValue;
