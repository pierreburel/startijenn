import util from 'gulp-util';
import webpack from 'webpack';
import BabiliPlugin from 'babili-webpack-plugin';
import pkg from '../package.json';

export default {
  deps: ['server']
};

export const build = {
  deps: util.env.production ? ['clean'] : [],
  sequence: [
    ['images', 'fonts', 'sprites'],
    ['styles', 'scripts'],
    ['views', 'copy']
  ]
};

export const clean = {
  src: './dist/*',
  del: {
    dot: true
  }
};

export const copy = {
  src: './src/static/**/*.*',
  dest: './dist/'
};

export const fonts = {
  src: './src/assets/fonts/**/*.{woff,woff2,ttg,otf}',
  dest: './dist/assets/fonts/'
};

export const images = {
  src: './src/assets/images/**/*.{jpg,jpeg,png,gif,svg}',
  dest: './dist/assets/images/',
  imagemin: {
    
  }
};

export const scripts = {
  src: './src/assets/scripts/*.js',
  dest: './dist/assets/scripts/',
  webpack: {
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
    devtool: util.env.production ? 'cheap-module-source-map' : 'cheap-module-eval-source-map'
  }
};

export const sprites = {
  src: './src/assets/images/sprite/*.svg',
  dest: './dist/assets/images/',
  svgmin: {
    
  },
  rename: {
    prefix: 'sprite-'
  },
  svgstore: {
    inline: true
  }
};

export const styles = {
  src: './src/assets/styles/**/*.scss',
  dest: './dist/assets/styles/',
  sass: {
    includePaths: ['./node_modules'],
    outputStyle: 'compressed',
    precision: 10
  },
  autoprefixer: {
    browsers: pkg.browserlist
  }
};

export const server = {
  deps: ['build'],
  browserSync: {
    files: [
      './dist/**/*.html', 
      './dist/assets/styles/**/*.css', 
      './dist/assets/scripts/**/*.js', 
      './dist/assets/images', 
      './dist/assets/fonts'
    ],
    injectChanges: true,
    server: './dist',
    ghostMode: false,
    open: false
  },
  watch: {
    copy: './src/static/**/*.*',
    fonts: './src/assets/fonts/**/*.{woff,woff2,ttg,otf}',
    images: './src/assets/images/**/*.{jpg,jpeg,png,gif,svg}',
    scripts: './src/assets/scripts/**/*.js',
    sprites: './src/assets/images/**/*.svg',
    styles: './src/assets/styles/**/*.scss',
    views: './src/**/*.pug'
  }
};

export const views = {
  src: ['./src/**/*.pug', '!./src/**/_*.pug'],
  dest: './dist',
  pug: {
    pretty: !!util.env.production,
    locals: {
      title: pkg.name,
      lang: 'fr'
    }
  }
};
