module.exports = {
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testMatch: ['**/*.test.ts', '**/*.test.js'],
  coveragePathIgnorePatterns: ['/node_modules/', '/build/'],
  testEnvironmentOptions: { url: 'http://localhost/' },
};
