const { override, addBabelPlugin, disableEsLint, addBabelPreset } = require('customize-cra');

module.exports = override(
  disableEsLint(),
  addBabelPreset('@babel/preset-typescript'),
  addBabelPreset('@babel/preset-react'),
  (config) => {
    config.resolve.modules.push(process.cwd() + '/node_modules');

    // Disable the ModuleScopePlugin which throws when importing modules outside of src/
    config.resolve.plugins = config.resolve.plugins.filter(
      (plugin) => plugin.constructor.name !== 'ModuleScopePlugin'
    );

    // Configure Jest
    if (process.env.NODE_ENV === 'test') {
      config.transform = {
        '^.+\\.(ts|tsx)$': 'ts-jest',
        '^.+\\.(js|jsx)$': 'babel-jest'
      };
      // Add Jest configuration
      config.jest = {
        ...config.jest,
        testEnvironment: 'jsdom',
        testEnvironmentOptions: {
          url: 'http://localhost',
          features: {
            FetchAPI: true,
            ProcessExternalResources: true,
            SkipExternalResources: false
          }
        },
        setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
        moduleNameMapper: {
          '^@/(.*)$': '<rootDir>/src/$1'
        }
      };
    }

    return config;
  }
);
