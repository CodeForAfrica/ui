window.data_file = "./data/data.json";
window.data_country_file = "./data/countries.json";
const s = document.createElement("script");
const n = document.getElementsByTagName("script")[0];
s.async = 1;
s.src = "./static/js/bundle.js";
n.parentNode.insertBefore(s, n);
