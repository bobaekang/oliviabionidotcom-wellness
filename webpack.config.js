const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

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
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
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
        inject: 'body'
    })
  ]
}