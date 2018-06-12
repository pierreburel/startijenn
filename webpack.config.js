const path = require('path');
const webpack = require('webpack');
const CleanPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

module.exports = (env, options) => {
  const distPath = path.resolve(__dirname, './dist/assets');
  const assetsPath = path.resolve(__dirname, './src/assets');
  const assetsFilenames = options.mode === 'production' ? '[name]-[hash:8]' : '[name]';

  return {
    context: assetsPath,
    entry: {
      main: [
        './scripts/main.js',
        './styles/main.scss'
      ]
    },
    output: {
      path: distPath,
      filename: `scripts/${assetsFilenames}.js`,
      publicPath: '/assets/'
    },
    devtool: options.mode === 'production' ? 'source-map' : 'cheap-eval-source-map',
    stats: 'minimal',
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(js|s?[ca]ss)$/,
          include: assetsPath,
          loader: 'import-glob-loader',
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.scss$/,
          include: assetsPath,
          use: [
            { loader: options.mode === 'production' ? MiniCssExtractPlugin.loader : 'style-loader' },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                ident: 'postcss',
                plugins: [
                  require('autoprefixer')(),
                  require('cssnano')() // TODO: disable on dev
                ]
              }
            },
            {
              loader: 'resolve-url-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                precision: 10
              }
            }
          ],
        },
        {
          test: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|svg|ico)$/,
          include: assetsPath,
          loader: 'url-loader',
          options: {
            limit: 4096,
            name: `[path]${assetsFilenames}.[ext]`,
          }
        },
        {
          test: /\.(ttf|otf|eot|woff2?|png|jpe?g|gif|svg|ico)$/,
          include: /node_modules/,
          loader: 'url-loader',
          options: {
            limit: 4096,
            outputPath: 'vendor/',
            name: `${assetsFilenames}.[ext]`,
          }
        }
      ]
    },
    resolve: {
      modules: [
        assetsPath,
        'node_modules',
      ],
      enforceExtension: false,
    },
    plugins: [
      new CleanPlugin([distPath], {
        verbose: false
      }),
      new MiniCssExtractPlugin({
        filename: `styles/${assetsFilenames}.css`
      }),
      new CopyWebpackPlugin([{
        from: 'images/**/*',
        to: `[path]${assetsFilenames}.[ext]`,
        toType: 'template'
      }]),
      new ManifestPlugin({
        map: (file) => {
          const sourcePath = path.basename(path.dirname(file.name));
          const targetPath = path.basename(path.dirname(file.path));
          if (sourcePath !== targetPath) {
            file.name = path.join(targetPath, file.name);
          }
          return file;
        }
      }),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new WriteFilePlugin()
    ],
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      publicPath: '/assets/',
      compress: true,
      port: 3000,
      hot: true,
      overlay: true,
      watchContentBase: true,
      stats: 'minimal'
    }
  }
};
