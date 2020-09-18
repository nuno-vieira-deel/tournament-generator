module.exports = {
  globals: { 'ts-jest': { tsConfig: 'tsconfig.json' } },
  roots: ['<rootDir>'],
  modulePaths: ['<rootDir>'],
  moduleFileExtensions: ['js', 'ts'],
  moduleNameMapper: {
    '^/test/(.*)$': '<rootDir>/test/$1',
    '^/generators(/.*)$': '<rootDir>/src/generators$1',
    '^/interfaces(/.*)$': '<rootDir>/src/interfaces$1',
    '^/utils(/.*)$': '<rootDir>/src/utils$1',
    '^/index$': '<rootDir>/src/index'
  },
  transform: { '^.+\\.ts$': 'ts-jest' },
  testMatch: ['**/test/**/*.test.ts'],
  testEnvironment: 'node'
};