const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')
const autoprefixer = require('autoprefixer')

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/'
}

module.exports = {
  // BASE config
  externals: {
    paths: PATHS
  },
  entry: {
    app: PATHS.src
  },
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
    publicPath: ''
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: '/node_modules/',
      use: [
      {loader: 'babel-loader'},
      //{loader: 'eslint-loader'}
      ]
    },
    {
      test: /\.(png|jpg|jpeg|gif|ico)$/,
      use: [{ loader: 'file-loader', 
          options:{outputPath:  `${PATHS.assets}/img/`, name: '[name]-[sha1:hash:7].[ext]'}}]
    }, 
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: {
              plugins: [
                  autoprefixer({
                    overrideBrowserslist: ['last 2 versions', 'ie 11']
                  })
              ],
              sourceMap: true
          }
      }, {
          loader: 'sass-loader',
          options: { sourceMap: true }
        }
      ]
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true }
        }, {
          loader: 'postcss-loader',
          options: {
              plugins: [
                  autoprefixer({
                      browsers: ['last 2 versions', 'ie 11']
                  })
              ],
              sourceMap: true
          }
      },
      ]
    }]
  },
 
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.dist}/style.css`
    }),
    new WebpackNotifierPlugin({alwaysNotify: true}),
    // Copy HtmlWebpackPlugin and change index.html for another html page
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
      filename: './index.html'
    }),
    new CopyWebpackPlugin([
      { from: `${PATHS.src}/img`, to: `${PATHS.assets}img` },
      { from: `${PATHS.src}/static`, to: '' },
    ])
  ],
}
