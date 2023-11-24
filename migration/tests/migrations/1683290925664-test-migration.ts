import _Migrator from '../../migrator';
import { updatedTestSchema } from '../schemas';

export async function up(): Promise<void> {
  const testModel = await _Migrator.getModel('test', updatedTestSchema);
  await testModel.updateMany({}, [
    {
      $set: {
        fullName: { $concat: ['$firstName', ' ', '$lastName'] },
        schemaVersion: 2,
      },
    },
  ]);
}

export async function down(): Promise<void> {
  const testModel = await _Migrator.getModel('test', updatedTestSchema);
  await testModel.updateMany(
    {},
    {
      schemaVersion: 1,
      $unset: {
        fullName: '',
      },
    },
  );
}
