import pkg from '../package.json';
import webpack from './webpack.config.js';

export default {
  deps: ['server']
};

export const build = {
  deps: ['clean'],
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
  src: './src/assets/images/**/*.{jpe?g,png,gif,svg}',
  dest: './dist/assets/images/',
  imagemin: {
    
  }
};

export const scripts = {
  src: './src/assets/scripts/*.js',
  dest: './dist/assets/scripts/',
  webpack: webpack
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
    images: './src/assets/images/**/*.{jpe?g,png,gif,svg}',
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
    
  }
};
