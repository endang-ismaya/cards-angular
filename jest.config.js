module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/dist/', '<rootDir>/tests/'],
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  passWithNoTests: true,
};
