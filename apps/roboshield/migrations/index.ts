import * as migration_20250422_064614_migration from "./20250422_064614_migration";
import * as migration_20250425_082829_slate_to_lexical from "./20250425_082829_slate_to_lexical";

export const migrations = [
  {
    up: migration_20250422_064614_migration.up,
    down: migration_20250422_064614_migration.down,
    name: "20250422_064614_migration",
  },
  {
    up: migration_20250425_082829_slate_to_lexical.up,
    down: migration_20250425_082829_slate_to_lexical.down,
    name: "20250425_082829_slate_to_lexical",
  },
];
