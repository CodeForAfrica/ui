const withCSS = require('@zeit/next-css');
const withImages = require('next-images');
const { parsed: localEnv } = require('dotenv').config()
const webpack = require('webpack')

module.exports = withCSS(withImages({
  webpack(config) {
    config.plugins.push(new webpack.EnvironmentPlugin(localEnv))

    return config
  }

}));
