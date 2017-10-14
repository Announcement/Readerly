module.exports = {
  entry: ['babel-polyfill', './original/main.js'],
  devtool: "source-map",
  output: {
    filename: "distribution/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ["source-map-loader"],
        enforce: "pre"
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["env"]
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      jquery: "jquery/src/jquery"
    }
  },
  // watch: true,
  // watchOptions: {
  //   ignored: /node_modules/
  // }
};
