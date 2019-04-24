const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    infoparse: "./src/index.js",
  },
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    library: "infoparse",
  },
};
