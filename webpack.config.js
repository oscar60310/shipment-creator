/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable no-undef */
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const webpack = require('webpack');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

module.exports = {
  context: path.resolve('src/'),
  entry: {
    client: './index'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    plugins: [new TsconfigPathsPlugin()]
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: {
          loader: 'ts-loader',
          options: { transpileOnly: true }
        }
      },
      {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/, /.svg$/],
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]'
        }
      }
    ]
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: './[name].[hash:8].js'
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: './index.html'
    }),
    new webpack.DefinePlugin({
      ENV: JSON.stringify({
        name: process.env.NODE_ENV
      })
    }),
    new SWPrecacheWebpackPlugin({
      cacheId: 'shipment-creator',
      filename: 'service-worker.js',
      minify: true,
      navigateFallback: 'https://oscar60310.github.io/shipment-creator',
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/]
    }),
    new WebpackPwaManifest({
      name: 'Shipment Creator',
      short_name: 'Shipment Creator',
      description: 'Shipment Creator',
      background_color: '#2196f3',
      crossorigin: null, //can be null, use-credentials or anonymous
      icons: [
        {
          src: path.resolve('src/icons/icon-512x512.png'),
          sizes: [96, 128, 192, 256, 384, 512] // multiple sizes
        }
      ]
    })
  ],
  devServer: {
    hot: true
  }
};
