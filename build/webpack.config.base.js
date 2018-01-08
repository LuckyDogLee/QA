const webpack = require('webpack');
const ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = () => {
  const base = {
    entry: {
      vendor: './src/vendor.js',
      main: './src/main.js',
    },
    module: {
      rules: [
        {
          test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/index.html',
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: Infinity,
      }),
      // new ChunkManifestPlugin({
      //   filename: 'chunkManifest.json',
      //   manifestVariable: 'webpackManifest',
      // }),
    ],
  };

  return base;
};
