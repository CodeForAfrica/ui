const typescriptConfig = require("../typescript");

const {
  mergeModuleNameMapper,
  mergeTestPathIgnorePatterns,
} = require("./shared");

function createNextLibraryJestConfig(customConfig = {}) {
  const { moduleNameMapper, testPathIgnorePatterns, ...rest } = customConfig;

  return {
    ...typescriptConfig,
    ...rest,
    moduleNameMapper: mergeModuleNameMapper(
      typescriptConfig.moduleNameMapper,
      moduleNameMapper,
    ),
    testPathIgnorePatterns: mergeTestPathIgnorePatterns(
      typescriptConfig.testPathIgnorePatterns,
      testPathIgnorePatterns,
    ),
  };
}

module.exports = createNextLibraryJestConfig;
