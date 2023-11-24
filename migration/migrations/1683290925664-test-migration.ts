import _Migrator from '../migrator';
import logger from '../monitoring/logger';

// this is a test migration, intended to ensure Github Action is working as expected

export async function up(): Promise<void> {
  logger.info('run up');
}

export async function down(): Promise<void> {
  logger.info('run down');
}
