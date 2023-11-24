import mongoose from 'mongoose';
import { seedData, testMigrateDown, testMigrateUp } from './test-helpers';

async function main() {
  await seedData();
  await testMigrateUp();
  await testMigrateDown();
}

main()
  .catch((err: Error) => {
    throw new Error(`Migration Failed: ${err}`);
  })
  .finally(() => mongoose.connection.close());
