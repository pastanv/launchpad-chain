module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleDirectories: ['node_modules', 'src'],
  collectCoverageFrom: ['src/**/*.{ts,js}', '!**/node_modules/**'],
};
