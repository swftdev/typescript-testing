import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  coverageReporters: ["lcov", "json", "text"],
  preset: "ts-jest",
  maxConcurrency: 8,
  testPathIgnorePatterns: ["/node_modules/", "/dist/"]
};
export default config;
