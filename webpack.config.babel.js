import _ from 'lodash';
import path from 'path';
var webpack = require('webpack');

const isDevServer = true;

module.exports = {
  entry: _.compact([
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.tsx'
  ]),
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loaders: _.compact([
          isDevServer && 'react-hot',
          `awesome-typescript-loader?${JSON.stringify({
            forkChecker: true,
            useBabel: true,
            useCache: isDevServer,
          })}`,
        ]),
      },

      {
        test: /\.json$/,
        loader: 'json'
      },
    ]
  },

  root: path.resolve('./src'),

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.ts', '.tsx']
  },

  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },

  devServer: {
    contentBase: './dist',
    hot: true
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};