import mongoose, { Model } from 'mongoose';
import _Migrator from '../migrator';
import logger from '../monitoring/logger';
import {
  originalTestSchema,
  IOriginalTest,
  updatedTestSchema,
  IUpdatedTest,
} from './schemas';

const TEST_MIGRATION_PATH = './migration/tests/migrations';
const TEST_DB_URI = 'mongodb://0.0.0.0:27057/test-db';

async function migrateUp() {
  await _Migrator.initMigrator(TEST_DB_URI, TEST_MIGRATION_PATH);
  await _Migrator.syncMigrations();
  await _Migrator.migrate('up', 'test-migration');
  await _Migrator.closeConnection();
}

async function migrateDown() {
  await _Migrator.initMigrator(TEST_DB_URI, TEST_MIGRATION_PATH);
  await _Migrator.syncMigrations();
  await _Migrator.migrate('down', 'test-migration');
  await _Migrator.closeConnection();
}

export async function seedData() {
  logger.info('seeding...');
  const conn = await mongoose.createConnection(TEST_DB_URI);
  const originalTestModel: Model<IOriginalTest> = conn.model(
    'test',
    originalTestSchema,
  );
  for (let i = 0; i < 10; i++) {
    await originalTestModel.create({
      firstName: i,
      lastName: i,
      schemaVersion: '1',
    });
  }
  await conn.close();
  logger.info('Done seeding!');
}

export async function testMigrateUp() {
  logger.info('testing migrate up...');
  await migrateUp();
  const conn = await mongoose.createConnection(TEST_DB_URI);
  const updatedTestModel: Model<IUpdatedTest> = conn.model(
    'test',
    updatedTestSchema,
  );
  const updatedDoc = await updatedTestModel.findOne({
    fullName: { $exists: true },
  });
  if (!updatedDoc || updatedDoc?.schemaVersion !== '2') {
    throw new Error('could not migrate up');
  }
  logger.info('test passed successfully');
  await conn.close();
}

export async function testMigrateDown() {
  logger.info('testing migrate down...');
  await migrateDown();
  const conn = await mongoose.createConnection(TEST_DB_URI);
  const originalTestModel: Model<IOriginalTest> = conn.model(
    'test',
    originalTestSchema,
  );
  const schemaVersionQuery = await originalTestModel.findOne({
    schemaVersion: 2,
  });
  const fullNameQuery = await originalTestModel.findOne({
    fullName: { $exists: true },
  });
  if (schemaVersionQuery || fullNameQuery) {
    throw new Error('could not migrate down');
  }
  logger.info('test passed successfully');
  await conn.close();
}
