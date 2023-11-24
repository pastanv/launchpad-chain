import mongoose, { model } from 'mongoose';
import Migrator from 'ts-migrate-mongoose';
import logger from './monitoring/logger';

const MONGO_URL = process.env.MONGO_URL;
const MIGRATIONS_PATH = './migration/migrations';

type Model = typeof mongoose.Model;

// use ts-migrate-mongoose API to programatically run migrations
const _Migrator = () => {
  let migrator: Migrator;
  let models = {};
  let modelsConnection: typeof mongoose;
  let mongoUri: string;

  const initMigrator = async (mongoURIArg?: string, migrationPath?: string) => {
    if (migrator) {
      logger.info('migrator already initialized');
      return;
    }

    mongoUri = mongoURIArg ?? MONGO_URL;

    logger.info('Connecting to MongoDB...');
    // Migrator.connect creates non-default connection using mongoose with provided uri
    migrator = await Migrator.connect({
      uri: mongoUri,
      autosync: true,
      migrationsPath: migrationPath ?? MIGRATIONS_PATH,
    });
    logger.info('Connected to MongoDB!');
  };

  const getMigrator = (): Migrator => {
    if (!migrator) {
      throw new Error('Migrator has not been initialized');
    }
    return migrator;
  };

  const getModel = async (
    key: string,
    schema: mongoose.Schema,
  ): Promise<Model> => {
    mongoose.set('strictQuery', false);

    // Ensure connection is open so we can run migrations
    modelsConnection = await mongoose.connect(mongoUri);

    if (!models[key]) {
      models[key] = model(key, schema);
    }
    return models[key];
  };

  const migrate = async (direction: 'up' | 'down', migrationName?: string) => {
    const migrator = getMigrator();
    direction === 'up'
      ? await migrateUp(migrator, migrationName)
      : await migrateDown(migrator, migrationName);
  };

  const migrateUp = async (migrator: Migrator, migrationName?: string) => {
    logger.info('Starting Migration...');
    await migrator.run('up', migrationName);
    logger.info('Migration Complete!');
  };

  const migrateDown = async (migrator: Migrator, migrationName?: string) => {
    logger.info('Starting Rollback...');
    await migrator.run('down', migrationName);
    logger.info('Rollback Complete!');
  };

  const listMigrations = async () => {
    // grabs state of all migrations
    const migrator = getMigrator();
    const migrations = await migrator.list();
    logger.info('---Migrations List---');
    migrations.map((migration) => logger.info(migration));
  };

  const closeConnection = async () => {
    logger.info('Close Connection to MongoDB');
    const _migrator = getMigrator();
    await _migrator.close();
    migrator = undefined;
    models = {};
    if (modelsConnection) modelsConnection.connection.close();
  };

  const syncMigrations = async () => {
    logger.info('Syncing Migrations');
    const migrator = getMigrator();
    await migrator.sync();
  };

  return {
    initMigrator,
    getModel,
    migrate,
    listMigrations,
    closeConnection,
    syncMigrations,
  };
};

export default _Migrator();
