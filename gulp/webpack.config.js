import pkg from '../package.json';
import BabiliPlugin from 'babili-webpack-plugin';

export default {
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
    new BabiliPlugin()
  ],
  devtool: 'source-map'
};
