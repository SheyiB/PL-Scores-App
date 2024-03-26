const tsconfig = require('./tsconfig.json');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  modulePaths: [tsconfig.compilerOptions.baseUrl], // Use tsconfig.compilerOptions.baseUrl instead

};