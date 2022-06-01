module.exports = {
  "*.{json,md}": ["eslint", "prettier --write"],
  "*.js": "eslint --fix",
  "*.{yaml,yml}": "prettier --write",
};
