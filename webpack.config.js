const path = require('path');

module.exports = {
  entry: path.join(__dirname, "src", "index.tsx"),
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
        // options: {
        //     modules: true,
        // },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    fallback: { path: require.resolve("path-browserify") },
  },
  output: {
    filename: 'bundle.js',
    path:path.resolve(__dirname, "dist"),
  }
}