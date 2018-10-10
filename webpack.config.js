const debug = process.env.NODE_ENV !== 'production'
const webpack = require('webpack')
const path = require('path')
// const CompressionPlugin = require('compression-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')

const config = {
  // TODO: Add common Configuration
  module: {}
}

const stylesConfig = Object.assign({}, config, {
  context: __dirname,
  devtool: debug ? 'inline-sourcemap' : '',
  name: 'styles',
  entry: {
    // landing: './frontend/landing/main.sass',
    main: './css/_all.sass'
  },
  module: {
    rules: [
      {
        test: /\.(sass|css)$/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader']),
        // loaders: ['style-loader', 'css-loader', 'resolve-url-loader' , 'sass-loader?sourceMap']

      }
    ]
  },
  output: {
    path: path.join(__dirname, ''),
    filename: './css/[name].css'
  },

  plugins: debug
    ? [
      new ExtractTextPlugin({filename: './css/[name].css', allChunks: true}),
      new LiveReloadPlugin()

    ]
    : [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new ExtractTextPlugin({filename: './[name].css', allChunks: true}),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.optimize.OccurrenceOrderPlugin()
    ]

})

module.exports = [
  stylesConfig
]
