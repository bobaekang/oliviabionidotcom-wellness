const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        scheme: 'data',
        type: 'asset/resource',
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [/node_modules/],
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            interpolate: true,
          },
        },
      },
      {
        test: /\.(ico|gif|png|jpe?g|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[ext]',
            context: './src',
            esModule: false,
          },
        },
        type: 'javascript/auto',
      },
    ],
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
        useShortDoctype: true,
      },
      meta: {
        url: {
          property: 'og:url',
          content: 'https://wellness.oliviabioni.com/',
        },
        description: {
          name: 'Description',
          property: 'og:description',
          content:
            "Hi, I'm Olivia. Join my private or group Pilates & yoga classes in Chicago. Learn more about me & my teaching here at my Olivia Bioni Wellness homepage.",
        },
        image: {
          property: 'og:image',
          content:
            'https://wellness.oliviabioni.com/assets/images/image-top.jpg',
        },
      },
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new CopyPlugin({
      patterns: [{ from: 'public', to: '' }],
    }),
  ],
}
