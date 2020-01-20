const path = require('path');
const {
  NODE_ENV = 'production',
} = process.env;
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './src/index.ts',
    mode: NODE_ENV,
    devtool: 'inline-source-map',
    target: 'node',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ],
    },
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    watch: NODE_ENV === 'development',
    externals: [ nodeExternals() ],
  };