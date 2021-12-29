import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  verbose: true,
  collectCoverage: true,
  coverageDirectory: 'test-coverage',
  collectCoverageFrom: [
    'src/**/*.ts',
  ],
  setupFiles: ['dotenv/config'],
  testEnvironment: 'node'
};

export default config;