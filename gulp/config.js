import pkg from '../package.json';
import webpack from './webpack.config.js';

export default {
  deps: ['watch']
};

export var build = {
  deps: ['clean'],
  sequence: [
    ['images', 'fonts', 'sprites'],
    ['styles', 'scripts'],
    ['copy']
  ]
};

export var clean = {
  src: './dist/*',
  del: {
    dot: true
  }
};

export var copy = {
  src: ['./src/**/*.*', '!./src/assets/**/*.*'],
  dest: './dist/'
};

export var fonts = {
  src: './src/assets/fonts/*',
  dest: './dist/assets/fonts/'
};

export var images = {
  src: './src/assets/images/**/*.{jpe?g,png,gif,svg}',
  dest: './dist/assets/images/',
  imagemin: {
    
  }
};

export var scripts = {
  src: './src/assets/scripts/*.js',
  dest: './dist/assets/scripts/',
  webpack: webpack
};

export var sprites = {
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

export var styles = {
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

export var watch = {
  deps: ['build'],
  watchers: [
    {
      src: copy.src,
      task: 'copy'
    },
    {
      src: fonts.src,
      task: 'fonts'
    },
    {
      src: images.src,
      task: 'images'
    },
    {
      src: './src/assets/scripts/**/*.js',
      task: 'scripts'
    },
    {
      src: sprites.src,
      task: 'sprites'
    },
    {
      src: styles.src, 
      task: 'styles'
    }
  ]
};
