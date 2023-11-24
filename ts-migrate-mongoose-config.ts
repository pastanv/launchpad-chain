import { MONGO_URL } from './src/config/envVars';

export default {
  uri: MONGO_URL,
  // specifies custom template to use when creating migration files
  templatePath: './migration/templates/template-v1.ts',
};
