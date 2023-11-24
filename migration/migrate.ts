import _Migrator from './migrator';
import logger from './monitoring/logger';

async function main() {
  await _Migrator.initMigrator();

  // Sync migrations, migrations in fs but not in database are added to db
  await _Migrator.syncMigrations();

  // ts-migrate-mongoose maintains the state of each migration in a collection
  // in the db instance.
  //
  // state: 'up' means the migration is complete, state: 'down' means the
  // migration was rolled back. The direction of the migration is a required
  // arugment. You can optionally specify the exact migration to run.
  //
  // Unless you specify the exact migration to run, the library will take the
  // migration direction, find all migrations that are currently in the opposite
  // state and run them. So be careful to specify the exact migration you'd like
  // to run, this will be necesary if we are in a state where our migrations are
  // a mix of 'up' and 'down' states.
  //
  // If we run a migration that has already been carried out, say rolling back
  // migrationA (so migrationA is currently in the 'down' state), then
  // ts-migrate-mongoose will not actually write to the db.

  // I suggest we maintain all migration files in this function, newly added migrations
  // will write to db while existing ones will have no effect on db.
  // For Example:
  // await _Migrator.migrate('up', 'add-permissions');
  // await _Migrator.migrate('up', 'test-migration');

  // list migrations
  await _Migrator.listMigrations();
}

main()
  .catch((err: Error) => {
    logger.error(`Migration Failed: ${err}`);
  })
  .finally(() => _Migrator.closeConnection());
