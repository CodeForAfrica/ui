module.exports = {
  "*.{json,md}": ["eslint", "prettier --write"],
  "*.js": "eslint --fix",
  "*.yml": "prettier --write",
};

