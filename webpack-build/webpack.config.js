const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackNotifierPlugin = require('webpack-notifier')

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist'),
  assets: 'assets/'
}

module.exports = {
	mode: 'development',

	module: {
		rules: [
		{
			test: /\.(png|jpg|jpeg|gif|ico)$/,
			use: [{ loader: 'file-loader', 
					options:{outputPath: '../img', name: '[name]-[sha1:hash:7].[ext]'}}]
		},
		{
			test: /\.(ttf|otf|eot|woff|woff2)$/,
			use: [{ loader: 'file-loader', 
					options:{outputPath: '../fonts', name: '[name].[ext]'}}]
		}

		]
	}
}