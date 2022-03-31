module.exports = {
  // resolves from test to snapshot path
  resolveSnapshotPath: (testPath, snapshotExtension) =>
    testPath.replace(/\.test\.(jsx?)/, `${snapshotExtension}.$1`),

  // resolves from snapshot to test path
  resolveTestPath: (snapshotFilePath, snapshotExtension) =>
    snapshotFilePath.replace(snapshotExtension, ".test"),

  // Example test path, used for preflight consistency check of the implementation above
  testPathForConsistencyCheck: "components/Button.test.js",
};
