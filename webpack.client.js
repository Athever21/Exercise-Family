const path = require("path");
const webpack = require("webpack");
const cwd = process.cwd();

module.exports = {
  name: "browser",
  devtool: "eval-source-map",
  mode: "development",
  entry: [
    "webpack-hot-middleware/client?reload=true",
    path.join(cwd, "client", "index.tsx"),
  ],
  output: {
    path: path.join(cwd, "build"),
    filename: "dist.js",
    publicPath: "/build/",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        include: path.join(cwd, "client"),
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        include: path.join(cwd, "client"),
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  optimization: {
    emitOnErrors: false
  },
  resolve: {
    extensions: [".ts",".tsx",".js",".json"],
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  }
};
