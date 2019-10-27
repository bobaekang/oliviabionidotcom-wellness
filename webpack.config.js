const path = require('path')
const glob = require('glob-all')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  devServer: {
      contentBase: './public'
  },
  module: {
    rules: [ 
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [
          /node_modules/
        ]
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              indent: 'postcss',
              plugins: [
                require('tailwindcss'),
                require('autoprefixer')
              ]
            }
          },
        ],
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            interpolate: true
          }
        }
      },
      {
        test: /\.(ico|gif|png|jpe?g|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            context: './src'     
          }
        }
      }
    ]
  },
  plugins: [ 
    new HtmlWebpackPlugin({
        template: path.join(__dirname, '/src/index.html'),
        inject: 'body',
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        }
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new PurgecssPlugin({
      paths: glob.sync([
        path.join(__dirname, '/src/**/*.html'),
        path.join(__dirname, '/src/*.js')
      ])
    })   
  ]
}