const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
- Webpack relies on Node to run the webpack bundler
*/
module.exports = {
  entry: path.join(__dirname, "src", "index.js"), // starting file that defines all files that need to be bundled.

  output: {
    path: path.resolve(__dirname, "dist"), // location where the bundled files exist
  },

  module: {
    rules: [
      {
        test: /\.?js$/, // regex on file names to determine what to transpile
        exclude: /node_modules/,
        use: {
          loader: "babel-loader", // is a webpack loader that will help webpack to use babel transpiler (babel-core)
          options: {
            presets: [
              '@babel/preset-env', // for transpiling ES2015+
             '@babel/preset-react' // for transpiling react code
            ]
          }
        }
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "src", "index.html"), // tells webpack to inject the bundle.js as a script tag into index.html
    }),
  ],
}
