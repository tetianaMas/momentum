const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
  resolve: {
    alias: {
      '@assets-root-path': path.resolve(__dirname, 'src/assets'), // alias for assets (use for images & fonts)
    },
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: './assets/styles/style.css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        'src/index.html',
        {
          from: 'src/assets/favicon.ico',
          to: 'favicon.ico',
        },
        {
          from: 'src/assets/fonts',
          to: 'assets/fonts',
        },
        {
          from: 'src/assets/svg',
          to: 'assets/svg',
        },
        {
          from: 'src/assets/sounds',
          to: 'assets/sounds',
        },
        {
          from: 'src/assets/quotes',
          to: 'assets/quotes',
        },
      ],
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3000,
  },
};
