import 'babel-polyfill';
import _ from 'lodash';
import path from 'path';
import assert from 'assert';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {
  ProvidePlugin, DefinePlugin, PrefetchPlugin, ContextReplacementPlugin,
  optimize,
} from 'webpack';
import {ForkCheckerPlugin} from 'awesome-typescript-loader';
import FailPlugin from 'webpack-fail-plugin';
// import TapPlugin from './tap-plugin';
import tslintConfig from './tslint.json';
import packageJSON from './package.json'

// const env = process.env.NODE_ENV;  // development | test | production

// const isDevelopmentEnv = true;
// const isTestEnv = env === 'test';
// const isProductionEnv = env === 'production';

// assert(isDevelopmentEnv || isTestEnv || isProductionEnv, "Invalid NODE_ENV");

// const isDevServer = true;

const devServerPort = 24285;

const commonConfig = {
  entry: _.compact([
    `webpack-dev-server/client?http://0.0.0.0:${devServerPort}`,
    'webpack/hot/only-dev-server',
    'babel-polyfill',
    './src/index',
  ]),

  resolve: {
    extensions: [
      '',
      '.js',
      '.ts',
      '.tsx'
    ],

    root: path.resolve('./src'),
  },

  module: {
    preLoaders: [
      {
        test: /\.tsx?$/,
        loader: 'tslint'
      },
    ],
    loaders: [
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.yaml$/,
        loaders: ['json', 'yaml']
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg$|\.woff2?$|\.eot$|\.ttf$|\.wav$/,
        loader: 'file'
      },
      {
        test: /\.tsx?$/,
        loaders: _.compact([
          'react-hot',
          `awesome-typescript-loader?${JSON.stringify({
            silent: true,
            forkChecker: true,
            useBabel: true,
            useCache: false, // isDevServer
          })}`,
        ]),
      },
    ]
  },

  plugins: _.compact([
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),

    // isDevServer &&
    new ForkCheckerPlugin(),

    // isProductionEnv &&
    // new optimize.OccurrenceOrderPlugin(true),
    // isProductionEnv &&
    // new optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),

    // prevent from loading all locales for `moment`
    // isDevelopmentEnv &&
    // new ContextReplacementPlugin(/moment\/locale$/, /en-gb/),

    // isDevelopmentEnv && new PrefetchPlugin('ice'),
    // isDevelopmentEnv && new PrefetchPlugin('material-ui'),

    // new PrefetchPlugin('ice'),
    // new PrefetchPlugin('material-ui'),

    new ProvidePlugin({
      React: 'react'
    }),

    // new DefinePlugin({
    //   'process.env.NODE_ENV': JSON.stringify(env),
    //   'APP_VERSION': JSON.stringify(packageJSON.version.replace(/\.0$/, '')),
    // }),

    // make webpack exit with error on build errors
    // !isDevServer &&
    // FailPlugin,
  ]),

  tslint: {
    configuration: tslintConfig,
    emitErrors: false,
  },

  devServer: {
    contentBase: 'build',
    host: '0.0.0.0',
    port: devServerPort,
    historyApiFallback: true,
  },

  // node: {
  //   fs: 'empty',
  //   net: 'empty',
  //   tls: 'empty'
  // },

  // devtool: isProductionEnv ? 'source-map' : 'eval',
  // devtool: 'eval',

  // output: {
  //   path: path.resolve('build'),
  //   publicPath: "/",
  //   filename: 'main.js',
  //   sourceMapFilename: '[file].map',
  //   chunkFilename: "[hash]/js/[id].js",
  //   hotUpdateMainFilename: "[hash]/update.json",
  //   hotUpdateChunkFilename: "[hash]/js/[id].update.js"
  // },

  // watchOptions: {
  //   ignored: /node_modules/
  //   // poll: true
  // },
};

export default commonConfig;
