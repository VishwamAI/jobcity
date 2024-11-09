const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@chakra-ui/react$': '<rootDir>/src/__mocks__/@chakra-ui/react.js',
    '^@chakra-ui/utils/context$': '<rootDir>/src/__mocks__/@chakra-ui/utils/context.js',
    '^@emotion/react$': '<rootDir>/src/__mocks__/@emotion/react.js'
  }
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)
