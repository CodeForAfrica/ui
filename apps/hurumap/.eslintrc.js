module.exports = {
  root: true,
  extends: ["eslint-config-commons-ui/next"],
  rules: {
    "no-underscore-dangle": [
      "error",
      {
        allow: ["_getStaticProps", "_getStaticPaths"],
      },
    ],
  },
};
