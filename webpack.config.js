const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
  },
  output: {
    filename: "infoparse.js",
    path: path.resolve(__dirname, "dist"),
    library: "infoparse",
    libraryTarget: "umd",
  },
};
