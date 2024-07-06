module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ['<rootDir>/test/unit/setupTests.ts']
};
