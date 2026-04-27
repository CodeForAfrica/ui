const nextModuleNameMapper = {
  "^@next/font/(.*)$": "jest-config-commons-ui/__mocks__/nextFontMock.js",
  "^next/font/(.*)$": "jest-config-commons-ui/__mocks__/nextFontMock.js",
  "^server-only$": "jest-config-commons-ui/__mocks__/empty.js",
};

function mergeModuleNameMapper(baseMapper, overrideMapper) {
  return {
    ...baseMapper,
    ...nextModuleNameMapper,
    ...overrideMapper,
  };
}

function mergeTestPathIgnorePatterns(basePatterns, overridePatterns) {
  return [...basePatterns, "<rootDir>/.next/", ...(overridePatterns || [])];
}

module.exports = {
  mergeModuleNameMapper,
  mergeTestPathIgnorePatterns,
  nextModuleNameMapper,
};
