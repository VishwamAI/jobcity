module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios|@chakra-ui|@emotion)/'
  ],
  moduleNameMapper: {
    '^@chakra-ui/(.*)$': '<rootDir>/node_modules/@chakra-ui/$1',
    '^@chakra-ui/utils/(.*)$': '<rootDir>/node_modules/@chakra-ui/utils/dist/cjs/$1'
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts']
};
