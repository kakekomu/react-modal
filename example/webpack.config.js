const path = require("path")
module.exports = {
  context: path.resolve(__dirname),
  entry: "./index.tsx",
  output: {
    path: path.resolve("dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".tsx"],
  },
  devServer: {
    contentBase: path.resolve(__dirname),
    open: true
  }
}
