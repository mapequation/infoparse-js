const path = require("path");

module.exports = {
  mode: "production",
  target: "node",
  entry: "./src/cli.js",
  output: {
    filename: "infoparse-cli.js",
    path: path.resolve(__dirname, "dist"),
    library: "infoparse",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
