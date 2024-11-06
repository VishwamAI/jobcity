module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios|@chakra-ui|@emotion)/'
  ],
  moduleNameMapper: {
    '^@chakra-ui/(.*)$': '<rootDir>/node_modules/@chakra-ui/$1',
    '^@chakra-ui/utils/context$': '<rootDir>/src/__mocks__/@chakra-ui/utils/context.js',
    '^@chakra-ui/utils/(.*)$': '<rootDir>/node_modules/@chakra-ui/utils/dist/cjs/$1',
    '^@chakra-ui/react/dist/(.*)$': '<rootDir>/node_modules/@chakra-ui/react/dist/$1',
    '^@chakra-ui/react$': '<rootDir>/node_modules/@chakra-ui/react',
    '^@chakra-ui/utils$': '<rootDir>/node_modules/@chakra-ui/utils',
    '^@chakra-ui/system/(.*)$': '<rootDir>/node_modules/@chakra-ui/system/dist/cjs/$1',
    '^@chakra-ui/system$': '<rootDir>/node_modules/@chakra-ui/system'
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts']
};
