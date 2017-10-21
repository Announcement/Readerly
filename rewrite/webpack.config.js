module.exports = {
  entry: ['babel-polyfill', './main.js'],
  devtool: 'eval',
  output: {
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['source-map-loader'],
        enforce: 'pre'
      },
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      jquery: 'jquery/src/jquery'
    }
  },
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  }
}
