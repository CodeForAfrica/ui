const nextJest = require("next/jest");

const { createTransformIgnorePatterns } = require("../shared");
const typescriptConfig = require("../typescript");

const {
  mergeModuleNameMapper,
  mergeTestPathIgnorePatterns,
  nextModuleNameMapper,
  payloadModuleNameMapper,
} = require("./shared");

function createNextAppJestConfig(customConfig = {}) {
  const {
    dir = "./",
    moduleNameMapper,
    payload = false,
    testPathIgnorePatterns,
    transpilePackages = [],
    transform: _transform,
    transformIgnorePatterns: _transformIgnorePatterns,
    ...rest
  } = customConfig;
  const {
    moduleNameMapper: baseModuleNameMapper,
    testPathIgnorePatterns: baseTestPathIgnorePatterns,
    transform: _baseTransform,
    transformIgnorePatterns: _baseTransformIgnorePatterns,
    ...baseConfig
  } = typescriptConfig;
  const createJestConfig = nextJest({ dir });
  const mergedModuleNameMapper = mergeModuleNameMapper(
    baseModuleNameMapper,
    nextModuleNameMapper,
    payload ? payloadModuleNameMapper : undefined,
    moduleNameMapper,
  );
  const resolveNextJestConfig = createJestConfig({
    ...baseConfig,
    ...rest,
    moduleNameMapper: mergedModuleNameMapper,
    testPathIgnorePatterns: mergeTestPathIgnorePatterns(
      baseTestPathIgnorePatterns,
      testPathIgnorePatterns,
    ),
  });

  return async (...args) => {
    const resolvedConfig = await resolveNextJestConfig(...args);

    return {
      ...resolvedConfig,
      moduleNameMapper: {
        ...mergedModuleNameMapper,
        ...resolvedConfig.moduleNameMapper,
      },
      transformIgnorePatterns: createTransformIgnorePatterns(transpilePackages),
    };
  };
}

module.exports = createNextAppJestConfig;
