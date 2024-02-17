import type { Config } from '@jest/types';

import jestConfig from '../jest.config';

const config: Config.InitialOptions = {
  ...jestConfig,
  testEnvironment: './prisma/prisma-test-environment.ts',
  rootDir: '../',
  testRegex: '.e2e-spec.ts$',
};

export default config;
