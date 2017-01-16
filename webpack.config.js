var path = require('path');
var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ClearWebpackPlugin = require('clean-webpack-plugin');

var copyPatterns = [
	{ from: './index.hml' },
	{ from: './images', to: 'images' },
]
var globals = {

}
isProd = false;
module.exports = {
	entry: "./app/app.js",
	output: {
		filename: "./bundle.js",
		sourceMapFilename: "./bundle.map",
		path: path.join(__dirname, '/dist')
	},
	devtool: '#souce-map',
	module: {
		loaders: [
			{
				loader: 'babel',
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				query: {
					presets: ['react', 'es2015', 'stage-2']
				}
			}
		]
	},
	resolve: {
		root: path.resolve('./app'),
		extenstions: ['', '.js']
	},
	plugin: (isProd) ? [
		new ClearWebpackPlugin(['dist'], {}),
		new CopyWebpackPlugin(copyPatterns, {}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.DefinePlugin(globals)
	] : [//devtool
			new ClearWebpackPlugin(['dist'], {}),
			new CopyWebpackPlugin(copyPatterns, {}),
			new webpack.DefinePlugin(globals)
		]
}