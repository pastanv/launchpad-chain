// This file here just as an example to demonstrate how a migration file can be written

import Migrator from '../migrator';
import * as schemas from '../../src/db/schemas';

export async function up(): Promise<void> {
  const providerAccessTokenModel = Migrator.getModel(
    'poa',
    schemas.providerAccessTokensSchema,
  );

  await providerAccessTokenModel.create({
    firstName: '123',
    lastName: '1234',
  });
}

export async function down(): Promise<void> {
  const providerAccessTokenModel = Migrator.getModel(
    'poa',
    schemas.providerAccessTokensSchema,
  );

  await providerAccessTokenModel.deleteOne({});
}
