const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: ["./index.js", "./style.scss"],

  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["es2015", "react"],
          plugins: [require("babel-plugin-transform-object-rest-spread")],
        },
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader", // creates style nodes from JS strings
          },
          {
            loader: "css-loader", // translates CSS into CommonJS
          },
          {
            loader: "sass-loader", // compiles Sass to CSS
          },
        ],
      },
    ],
  },
};
