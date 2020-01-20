const HelloWorld = require('./helloworld');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const path = require('path');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const jsLoaders = () => {
  const loaders = [{
    loader: 'babel-loader',
    options: babelOptions()
  }];
  if (isDev) {
    loaders.push('eslint-loader');
  }
  return loaders
}

const babelOptions = (preset) => {
  const opt = {
    presets: [
      '@babel/preset-env'
    ],
    plugins: [
      '@babel/plugin-proposal-class-properties'
    ]
  }
  if (preset) {
    opt.presets.push(preset)
  }
  return opt
}

const optimization = () => {
  const config  = {
      splitChunks: {
        chunks: 'all'
    }
  }
  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsPlugin(),
      new TerserPlugin()
    ]
  }
  return config
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry:{ 
    main: ['@babel/polyfill', './index.jsx'],
    analytics: './analytics.ts'
  },
  output:{
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions:['.js', '.json'],
    alias: {
      '@models': path.resolve(__dirname, 'src/models'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: optimization(),
  plugins:[new HelloWorld({
      message: "Hello world from the config"
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/favicon.ico'),
        to: path.resolve(__dirname, 'dist')
      }
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css'
    }),
    new BundleAnalyzerPlugin()

  ],
  module: {
    rules:[
      {
        test: /\.css$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDev,
            reloadAll: true
          },
        }, 'css-loader']
      },
      {
        test: /\.less$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDev,
            reloadAll: true
          },
        }, 
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.(png|jpg|svg)$/,
        use: ['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2)$/,
        use: ['file-loader']
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-typescript')
        },
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: {
          loader: 'babel-loader',
          options: babelOptions('@babel/preset-react')
        },
      }
    ]
  },
  devServer: {
    port: 4200,
    hot: isDev
  }
}