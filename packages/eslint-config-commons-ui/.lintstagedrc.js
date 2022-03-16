module.exports = {
  "*.{json,md}": ["eslint --fix", "prettier --write"],
  "*.js": "eslint --fix",
  "*.yml": "prettier --write",
};
