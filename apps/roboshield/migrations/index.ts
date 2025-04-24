import * as migration_20250422_064614_migration from "./20250422_064614_migration";

export const migrations = [
  {
    up: migration_20250422_064614_migration.up,
    down: migration_20250422_064614_migration.down,
    name: "20250422_064614_migration",
  },
];
