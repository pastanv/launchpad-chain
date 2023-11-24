import _Migrator from '../migrator';
import * as schemas from '../../src/db/schemas';

// CAUTION: for certain migrations, the up or down function will be carried out using the
// original schema (pre-migration). DON'T delete the original schema, even if it is not
// required for the migration, in case of a rollback. More detail here:
// https://polymath.atlassian.net/wiki/spaces/EN/pages/2406121473/How+To+Migrate

export async function up(): Promise<void> {
  // get models here using _Migrator.getModel(), Example
  // const permissionsModel = await _Migrator.getModel('permissions', schemas.permissionSchema);
  // Write migration here, Example:
  // await permissionsModel.create({
  // userId: '123',
  // marketplaceId: '1234',
  // });
}

export async function down(): Promise<void> {
  // get models here using _Migrator.getModel(), Example
  // const permissionsModel = await _Migrator.getModel('permissions', schemas.permissionSchema);
  // Write migration here, Example:
  // await permissionsModel.deleteOne({});
}
