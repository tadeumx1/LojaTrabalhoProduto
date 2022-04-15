const PERCENTAGE_COVERAGE = 88;

module.exports = {
  verbose: true,
  preset: 'react-native',
  clearMocks: true,
  modulePathIgnorePatterns: [
    '<rootDir>/examples/',
    '<rootDir>/node_modules/',
    '<rootDir>/lib/',
  ],
  watchPathIgnorePatterns: [
    '<rootDir>/examples/',
    '<rootDir>/node_modules/',
    '<rootDir>/lib/',
  ],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/index.*',
    '!src/assets/**/*',
    '!src/router.tsx',
    '!src/infra/protocols/**/*',
    '!src/protocols/**/*',
    '!src/infra/helpers/*',
    '!src/main/factories/**/*',
    '!src/main/erros/index.ts',
    '!src/**/**.style.{ts,tsx}',
    '!src/**/index.{js,jsx,ts,tsx}',
  ],
  testMatch: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec).[jt]s?(x)'],
  testResultsProcessor: 'jest-sonar-reporter',
  coverageThreshold: {
    global: {
      branches: PERCENTAGE_COVERAGE - 10,
      functions: PERCENTAGE_COVERAGE,
      lines: PERCENTAGE_COVERAGE,
      statements: PERCENTAGE_COVERAGE,
    },
  },
  setupFiles: ['<rootDir>/jestSetup.js'],
};
