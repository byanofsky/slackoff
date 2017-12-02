const path = require('path');

module.exports = {
  entry: './client/src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './client/dist'),
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: './client/dist',
    proxy: {
      '/socket.io': 'http://localhost:3000/socket.io',
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
};
