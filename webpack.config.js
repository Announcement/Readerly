module.exports = {
  entry: ['babel-polyfill', './rewrite/main.js'],
  devtool: 'eval',
  output: {
    filename: 'rewrite/bundle.js'
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: ["source-map-loader"],
      //   enforce: "pre"
      // },
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: "babel-loader",
      //     options: {
      //       presets: ["env"]
      //     }
      //   }
      // },
      // {
      //   test: /\.css$/,
      //   use: [
      //     // 'style-loader',
      //     {
      //       loader: 'css-loader',
      //       options: {
      //         url: false
      //       }
      //     }
      //   ],
      // }
    ]
  },
  stats: 'detailed',
  resolve: {
    alias: {
      jquery: 'jquery/src/jquery'
    }
  },
  // watch: true,
  // watchOptions: {
  //   ignored: /node_modules/
  // }
}
