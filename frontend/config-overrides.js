const { override, addBabelPlugin, disableEsLint } = require('customize-cra');

module.exports = override(
  disableEsLint(),
  (config) => {
    config.resolve.modules.push(process.cwd() + '/node_modules');

    // Disable the ModuleScopePlugin which throws when importing modules outside of src/
    config.resolve.plugins = config.resolve.plugins.filter(
      (plugin) => plugin.constructor.name !== 'ModuleScopePlugin'
    );

    return config;
  }
);
