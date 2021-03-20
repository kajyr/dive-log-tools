module.exports = {
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/*.test.ts", "**/*.test.js"],
  testURL: "http://localhost/",
  coveragePathIgnorePatterns: ["/node_modules/", "/build/"],
};
