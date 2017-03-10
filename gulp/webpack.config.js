import webpack from 'webpack';
import BabiliPlugin from 'babili-webpack-plugin';
import pkg from '../package.json';

export default {
  output: {
    publicPath: 'assets/scripts/',
    chunkFilename: '[id].chunk.js'
  },
  module: {
    rules: [
      { 
        test: /\.js$/, 
        exclude: /node_modules/, 
        loader: 'babel-loader',
        options: {
          presets: [
            ['env', {
              targets: {
                browsers: pkg.browserlist
              }
            }],
            ['babili']
          ]
        }
      }
    ]
  },
  plugins: [
    new BabiliPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    })
  ],
  devtool: 'cheap-eval-source-map'
};
