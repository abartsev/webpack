const HelloWorld = require('./helloworld')
var HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
var path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry:{ 
    main: './index.js',
    analytics: './analytics.js'
  },
  output:{
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins:[new HelloWorld({
      message: "Hello world from the config"
    }),
    new HtmlWebpackPlugin({
      template: "./index.html"
    }),
    new CleanWebpackPlugin()

  ],
  module: {
    rules:[
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        use: ['file-loader']
      }
    ]

  },
  devServer: {
    port: 3000
  }
}