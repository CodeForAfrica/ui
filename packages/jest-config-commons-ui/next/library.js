const typescriptConfig = require("../typescript");

const {
  mergeModuleNameMapper,
  mergeTestPathIgnorePatterns,
  nextModuleNameMapper,
} = require("./shared");

function createNextLibraryJestConfig(customConfig = {}) {
  const { moduleNameMapper, testPathIgnorePatterns, ...rest } = customConfig;

  return {
    ...typescriptConfig,
    ...rest,
    moduleNameMapper: mergeModuleNameMapper(
      typescriptConfig.moduleNameMapper,
      nextModuleNameMapper,
      moduleNameMapper,
    ),
    testPathIgnorePatterns: mergeTestPathIgnorePatterns(
      typescriptConfig.testPathIgnorePatterns,
      testPathIgnorePatterns,
    ),
  };
}

module.exports = createNextLibraryJestConfig;
