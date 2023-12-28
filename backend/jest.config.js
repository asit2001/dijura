/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  "moduleNameMapper": {
    "^@/controller/(.*)$": "<rootDir>/src/api/v1/controller/$1",
    "^@/config/(.*)$": "<rootDir>/src/config/$1",
    "^@/types/(.*)$": "<rootDir>/src/types/$1",
    "^@/repo/(.*)$": "<rootDir>/src/database/repository/$1",
    "^@/utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@/service/(.*)$": "<rootDir>/src/database/service/$1",
    "^@/error/(.*)$": "<rootDir>/src/errors/$1",
    "^@/middleware/(.*)$": "<rootDir>/src/middleware/$1",
    "^@/router/(.*)$": "<rootDir>/src/api/v1/routes/$1"
  }
  
};