const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const development = process.env.NODE_ENV !== 'production';

function getProdConfig() {
  return {
    mode: 'production',
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: false, // set to true if you want JS source maps
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
    },
  };
}

const commonConfig = {
  entry: {
    server: './src/server/server',
    main: './src/client/index.js',
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].js',
    globalObject: 'this',
  },
  mode: 'development',
  target: 'node',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false, // if you don't put this is, __dirname
    __filename: false, // and __filename return blank or /
  },
  devtool: 'source-map',
  optimization: {
    minimize: false,
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: {
          emitWarning: true,
          failOnError: false,
          failOnWarning: false,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: { minimize: true },
          },
        ],
      },
      {
        // Loads images into CSS and Javascript files
        test: /\.jpg$/,
        use: [{ loader: 'url-loader' }],
      },
      {
        // Loads CSS into a file when you import it via Javascript
        // Rules are set in MiniCssExtractPlugin
        test: /\.css$/,
        use: ['css-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/client/html/index.html',
      filename: './index.html',
      excludeChunks: ['server'],
    }),
    new CopyWebpackPlugin({ patterns: ['src/assets'] }),
    new webpack.NoEmitOnErrorsPlugin(),
  ],
};

if (development) {
  module.exports = commonConfig;
} else {
  module.exports = Object.assign({}, commonConfig, getProdConfig());
}
