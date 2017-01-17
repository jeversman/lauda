
// from webpack.config... --------------------

// {
//     test: /\.jsx?$|\.tsx?$/,
//         exclude: /node_modules/,
//     // loader: 'react-hot!babel'
//     loader: 'babel-loader'
// },

// --------------------------------------



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

const env = process.env.NODE_ENV;  // development | test | production

// const isDevelopmentEnv = env === 'development';
const isDevelopmentEnv = true;
const isTestEnv = env === 'test';
const isProductionEnv = env === 'production';

assert(isDevelopmentEnv || isTestEnv || isProductionEnv, "Invalid NODE_ENV");

const isDevServer =
    path.basename(require.main.filename) === 'webpack-dev-server.js';

const devServerPort = 24285;

const commonConfig = {
    resolve: {
        extensions: [
            '',
            '.js',
            '.ts',
            '.tsx'
        ],

        root: path.resolve('./src'),

        alias: {
            Hello: path.resolve('./src/slices'),
            'react/lib/ReactMount': 'react-dom/lib/ReactMount'
        },
    },

    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.ico|\.svg$|\.woff2?$|\.eot$|\.ttf$|\.wav$/,
                loader: 'file'
            }
        ]
    },

    plugins: _.compact([
        // prevent from loading all locales for `moment`
        isDevelopmentEnv &&
        new ContextReplacementPlugin(/moment\/locale$/, /en-gb/),

        isDevelopmentEnv && new PrefetchPlugin('ice'),
        // isDevelopmentEnv && new PrefetchPlugin('material-ui'),

        new ProvidePlugin({
            React: 'react'
        }),

        new DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(env),
            'APP_VERSION': JSON.stringify(packageJSON.version.replace(/\.0$/, '')),
        }),

        // make webpack exit with error on build errors
        !isDevServer && FailPlugin,
    ]),

    tslint: {
        configuration: tslintConfig,

        emitErrors: true,
    },

    watchOptions: {
        poll: true
    },
};


const createConfig = (config) =>
    _.mergeWith({}, commonConfig, config, (objValue, srcValue) => {
        if (_.isArray(objValue)) {
            return objValue.concat(srcValue);
        }
    });


const buildConfig = createConfig({
    entry: _.compact([
        isDevServer && `webpack-dev-server/client?http://0.0.0.0:${devServerPort}`,
        isDevServer && 'webpack/hot/only-dev-server',
        'babel-polyfill',
        './src/index',
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
        ],
    },

    node: {
        fs: 'empty',
        net: 'empty',
        tls: 'empty'
    },

    output: {
        path: path.resolve('build'),
        publicPath: "/",
        filename: 'main.js',
        sourceMapFilename: '[file].map',
        chunkFilename: "[hash]/js/[id].js",
        hotUpdateMainFilename: "[hash]/update.json",
        hotUpdateChunkFilename: "[hash]/js/[id].update.js"
    },

    plugins: _.compact([
        new HtmlWebpackPlugin({
            template: 'src/index.html'
        }),

        isDevServer && new ForkCheckerPlugin(),

        isProductionEnv && new optimize.OccurrenceOrderPlugin(true),
        isProductionEnv && new optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
    ]),

    devtool: isProductionEnv ? 'source-map' : 'eval',

    devServer: {
        contentBase: 'build',
        host: '0.0.0.0',
        port: devServerPort,
        historyApiFallback: true,
    }
});

export default buildConfig;
