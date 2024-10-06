const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    supportFile: false,
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'webpack',
    },
  },
})
