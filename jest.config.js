'use strict';

// Two suites: unit tests (with coverage, run on every build) and the release regression suite
// (run by the regression workflow, published as the ReleaseRegression artifact).
module.exports = {
  projects: [
    { displayName: 'unit', testMatch: ['<rootDir>/tests/unit/**/*.test.js'] },
    { displayName: 'regression', testMatch: ['<rootDir>/tests/regression/**/*.test.js'] },
  ],
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['cobertura', 'text-summary'],
  reporters: ['default', 'jest-junit'],
};
