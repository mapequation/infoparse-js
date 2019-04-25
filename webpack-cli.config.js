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
};
