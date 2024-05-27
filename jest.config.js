// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jest-environment-jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    transformIgnorePatterns: ['/node_modules/'],
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.jest.json', // Use this if you have a specific tsconfig for jest
      },
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  };
  