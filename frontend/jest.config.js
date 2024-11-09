module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios|@chakra-ui|@emotion)/'
  ],
  moduleNameMapper: {
    '^@chakra-ui/react$': '<rootDir>/src/__mocks__/@chakra-ui/react.js',
    '^@chakra-ui/utils/context$': '<rootDir>/src/__mocks__/@chakra-ui/utils/context.js',
    '^@chakra-ui/(.*)$': '<rootDir>/node_modules/@chakra-ui/$1',
    '^@emotion/react$': '<rootDir>/src/__mocks__/@emotion/react.js',
    '^@emotion/styled/base$': '<rootDir>/node_modules/@emotion/styled/base/dist/emotion-styled-base.cjs.js',
    '^@emotion/(.*)$': '<rootDir>/node_modules/@emotion/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts']
};
