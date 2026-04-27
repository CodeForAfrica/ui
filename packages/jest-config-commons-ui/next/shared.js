const nextModuleNameMapper = {
  "^@next/font/(.*)$": "jest-config-commons-ui/__mocks__/nextFontMock.js",
  "^next/font/(.*)$": "jest-config-commons-ui/__mocks__/nextFontMock.js",
  "^server-only$": "jest-config-commons-ui/__mocks__/empty.js",
};

const payloadModuleNameMapper = {
  // Jest 30's resolver can fail on Payload's package metadata.
  "^payload$": "<rootDir>/node_modules/payload/dist/index.js",
};

function mergeModuleNameMapper(...mappers) {
  return Object.assign({}, ...mappers.filter(Boolean));
}

function mergeTestPathIgnorePatterns(basePatterns, overridePatterns) {
  return [...basePatterns, "<rootDir>/.next/", ...(overridePatterns || [])];
}

module.exports = {
  mergeModuleNameMapper,
  mergeTestPathIgnorePatterns,
  nextModuleNameMapper,
  payloadModuleNameMapper,
};
