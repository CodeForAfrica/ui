import { MigrateDownArgs, MigrateUpArgs } from "@payloadcms/db-mongodb";
import { migrateSlateToLexical } from "@payloadcms/richtext-lexical/migrate";

export async function up({
  payload,
  req,
  session,
}: MigrateUpArgs): Promise<void> {
  payload.logger.info(`Starting slate to lexical migration process...`);
  await migrateSlateToLexical({ payload });
}

export async function down({
  payload,
  req,
  session,
}: MigrateDownArgs): Promise<void> {
  // Migration code
}
