/** @type {import("jest").Config} */
const config = {
  clearMocks: true,
  restoreMocks: true,
  resetMocks: true,

  collectCoverageFrom: ["src/**/*.ts"],

  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },

  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1",
  },

  testPathIgnorePatterns: ["<rootDir>/dist/.*"],

  extensionsToTreatAsEsm: [".ts"],

  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        useESM: true,
        tsconfig: "./tsconfig.json",
      },
    ],
  },

  coveragePathIgnorePatterns: ["/node_modules/", "/dist/"],
};

export default config;
