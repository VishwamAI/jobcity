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
    }

    return config;
  }
);
