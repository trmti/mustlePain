const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV;

const commonConfig = {
  mode: env,

  devServer: {
    static: [
      {
        directory: path.join(__dirname, 'public'),
        watch: true,
      },
    ],
    port: 3000,
  },

  resolve: {
    fallback: {
      crypto: false,
    },
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(css)$/,
        use: [
          env === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },

  plugins: [
    new webpack.EnvironmentPlugin({
      LIFF_ID: 'yourliffid',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
};

const vanillaConfig = merge(commonConfig, {
  name: 'vanilla',
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
    assetModuleFilename: 'images/[name][ext]',
  },
  plugins: [new HtmlWebpackPlugin({ template: './index.html' })],
  module: {
    rules: [
      {
        test: /\.(ico|svg|jpe?g|png|webp)$/,
        type: 'asset/inline',
      },
    ],
  },
});

// TODO: Add entries for other implementations.

module.exports = [vanillaConfig];
