const path = require('path')
const glob = require('glob-all')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin');

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
            context: './src',
            esModule: false
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
        },
        meta: {
          url: {
            property: 'og:url',
            content: 'https://wellness.oliviabioni.com/'
          },
          description: {
            name: 'Description',
            property: 'og:description',
            content: "Hi, I'm Olivia. Join my private or group Pilates & yoga classes in Chicago. Learn more about me & my teaching here at my Olivia Bioni Wellness homepage."
          },
          image: {
            property: 'og:image',
            content: 'https://wellness.oliviabioni.com/assets/images/image-top.jpg'
          }
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
    }),
    new CopyPlugin([
      {
        from: 'public',
        to: ''
      }
    ])
  ]
}