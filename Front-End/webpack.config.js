const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dotenv = require('dotenv-webpack');
const webpack = require('webpack');

const { NODE_ENV } = process.env;

const env = new dotenv({
  path: NODE_ENV === 'development' ? '.env.dev' : '.env',
}).definitions;

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    publicPath: '/',
    path: path.join(__dirname, '/dist'),
    filename: 'index_bundle.js',
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, './src/components'),
      Reducer: path.resolve(__dirname, './src/reducer/'),
      Style: path.resolve(__dirname, './src/style/'),
      Config: path.resolve(__dirname, './src/config/'),
      '@': path.resolve(__dirname, './src/'),
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_module/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new webpack.DefinePlugin({
      JWT_SECRET: env['process.env.JWT_SECRET'],
    }),
  ],
};
