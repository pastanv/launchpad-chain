// Add all the required env variables here..
const MANDATORY_ENV_VARIABLES = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
};

export const IS_DEV = process.env.NODE_ENV === 'development';
export const PORT = process.env.PORT;

export const getMissingEnvVars = () => {
  const missingVariables = [];
  for (const [key, value] of Object.entries(MANDATORY_ENV_VARIABLES)) {
    if (value) continue;
    missingVariables.push(key);
  }
  return missingVariables;
};

export const checkForMandatoryEnvVars = () => {
  const missingEnvVars = getMissingEnvVars();
  if (missingEnvVars.length === 0) return true;
  const pluralText = missingEnvVars.length === 1 ? 'is' : 'are';
  const errorMessage = `${missingEnvVars.join(
    ', ',
  )} ${pluralText} missing in .env`;
  throw new Error(errorMessage);
};
