module.exports = {
  coveragePathIgnorePatterns: ['/node_modules/', '/build/'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testEnvironmentOptions: { url: 'http://localhost/' },
  testMatch: ['**/*.test.ts', '**/*.test.js'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};
