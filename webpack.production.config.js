const path = require('path');
var HTMLWebpackPlugin = require('html-webpack-plugin')
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
})

module.exports = {
  name: 'production',
  entry: './app/index.js',
  devServer: { inline: true },
  output: {
    filename: 'ya-nn.js',
    path: './build'
  },
  resolve : {
    extensions: ['','.js'],
    root: path.resolve(__dirname, 'app')
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?minimize'
      }
    ],
  },
  plugins: [HTMLWebpackPluginConfig],
};